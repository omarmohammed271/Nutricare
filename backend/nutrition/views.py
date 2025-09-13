# app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalcRequestSerializer
from . import utils

EQUATION_MAP = {
    "bmi": utils.bmi,
    "ibw_hamwi": utils.ibw_hamwi,
    "ibw_lemmens": utils.ibw_lemmens,
    "percent_ibw": utils.percent_ibw,
    "adjusted_body_weight": utils.adjusted_body_weight,
    "dry_weight": utils.dry_weight,
    "ibw_amputation": utils.ibw_amputation,
    "waist_height_ratio": utils.waist_height_ratio,
    "percent_ubw": utils.percent_ubw,
    "percent_weight_change": utils.percent_weight_change,
    "demi_span_height": utils.demi_span_height,
    "knee_height_estimate": utils.knee_height_estimate,
    "harris_benedict": utils.harris_benedict,
    "mifflin": utils.mifflin_st_jeor,
    "tee": utils.total_energy_expenditure,
    "penn_state": utils.penn_state,
    "cunningham": utils.cunningham,
    "baseline_fluid_bsa": utils.baseline_fluid_bsa,
    "baseline_fluid_standard": utils.baseline_fluid_standard,
    "insulin_to_carb_ratio": utils.insulin_to_carb_ratio,
    "insulin_sensitivity": utils.insulin_sensitivity,
    "insulin_initial_dose": utils.insulin_initial_dose,
    "free_water_deficit": utils.free_water_deficit,
    "nitrogen_balance": utils.nitrogen_balance,
    "nutrition_risk_index": utils.nutrition_risk_index,
    "total_lymphocyte_count": utils.total_lymphocyte_count,
}

class CalcAPIView(APIView):
    def get(self, request, *args, **kwargs):
        response = {"available_equations": list(EQUATION_MAP.keys())}
        return Response(response,status=status.HTTP_200_OK)
    def post(self, request):
        serializer = CalcRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        eq = serializer.validated_data["equation"]
        inputs = serializer.validated_data.get("inputs", {})
        fn = EQUATION_MAP.get(eq)
        if not fn:
            return Response({"error": f"Unknown equation '{eq}'"}, status=400)
        # convert numeric strings in inputs to numbers where possible
        parsed = {}
        for k,v in inputs.items():
            try:
                if isinstance(v, (int, float)):
                    parsed[k] = v
                else:
                    # try int then float
                    if str(v).isdigit():
                        parsed[k] = int(v)
                    else:
                        parsed[k] = float(v)
            except:
                # keep strings (like gender)
                parsed[k] = v
        try:
            result = fn(**parsed)
        except TypeError as e:
            return Response({"error": "Invalid/missing parameters", "details": str(e)}, status=400)
        except ValueError as e:
            return Response({"error": str(e)}, status=400)
        return Response({"equation": eq, "inputs": parsed, "result": result})
