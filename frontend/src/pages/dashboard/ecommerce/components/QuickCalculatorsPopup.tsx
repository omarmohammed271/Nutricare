import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField,
  Select, MenuItem, FormControl, IconButton, Snackbar, Alert,
  ListSubheader
} from "@mui/material";
import { LuX } from "react-icons/lu";
import { useMemo, useState } from "react";
import { equationsConfig } from "./equations"; // config with calculators and inputs
import { useMutation } from "@tanstack/react-query";
import { addCaclulations } from "@src/api/endpoints";
import React from "react";

interface QuickCalculatorsPopupProps {
  open: boolean;
  onClose: () => void;
}

interface EquationInputData {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

const QuickCalculatorsPopup = ({ open, onClose }: QuickCalculatorsPopupProps) => {
  // store form values dynamically by field name
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    calculatorType: "bmi", // default selection
  });

  // toast for feedback
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // result object from API
  const [result, setResult] = useState<{ value: string; unit: string; interpretation?: string }>();

  // POST calculation mutation
  const { mutate, isSuccess } = useMutation({
    mutationFn: addCaclulations,
    mutationKey: ["new_calculation"],
    onSuccess(data: any) {
      setToast({ open: true, message: "Calculation added successfully!", severity: "success" });
      setResult(data.data.result);
    },
    onError() {
      setToast({ open: true, message: "Failed to add calculation.", severity: "error" });
    }
  });

  // flatten all equations into one array for easier lookup
  const allEquations = useMemo(
    () => equationsConfig.flatMap((cat) => cat.equations),
    []
  );

  // for BMI, allow switching between Metric/Imperial sets
  const [bmiInputSet, setBmiInputSet] = useState(0);

  const handleBMISystem = (value: string | number) => {
    setBmiInputSet(value as number);
  };

  // update formData when user types/selects
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // get the config of the selected calculator
  const selectedEquation: any = allEquations.find(
    (eq) => eq.code === formData.calculatorType
  );

  // build payload and call API
  const handleAddCaculation = () => {
    if (!selectedEquation) return;
  
    const inputs: { [key: string]: string | number } = {};
    let availableInputs;

    // choose correct set for BMI
    if (selectedEquation.code === "bmi") {
      availableInputs = selectedEquation.inputs[bmiInputSet];
    } else {
      availableInputs = selectedEquation.inputs;
    }

    // gather values from formData
    availableInputs.forEach((input: EquationInputData) => {
      if (formData[input.name]) {
        inputs[input.name] =
          input.type === "number" ? Number(formData[input.name]) : formData[input.name];
      }
    });
  
    const payload = {
      equation: selectedEquation.id,
      inputs,
    };

    mutate(payload);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            minHeight: "700px",
          },
        }}
      >
        {/* HEADER */}
        <DialogTitle
          sx={{
            pb: 2,
            borderBottom: (theme) => theme.palette.mode === "dark" ? "1px solid #333333" : "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "24px" }}>
            Quick Calculators
          </Typography>
          <IconButton onClick={onClose}>
            <LuX size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, pt: 4 }}>
          {/* CALCULATOR TYPE SELECT */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
              Calculator Type
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.calculatorType}
                onChange={(e) => handleInputChange("calculatorType", e.target.value)}
              >
                {equationsConfig.map((category) => [
                  <ListSubheader key={category.id} sx={{ 
                    p: 0,
                    px: 2, 
                    fontWeight: 600, 
                    color: (theme) => theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                    fontSize: "14px",
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5",
                    borderBottom: (theme) => theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e0e0e0"
                  }}>
                    {category.name}
                  </ListSubheader>,
                  category.equations.map((equation) => (
                    <MenuItem key={equation.code} value={equation.code}>
                      {equation.name}
                    </MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>
          </Box>

          {/* DYNAMIC INPUTS */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {selectedEquation?.code === "bmi" ? (
              <Box>
                {/* BMI system toggle */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, minWidth: "180px" }}>
                    Input System
                  </Typography>
                  <FormControl sx={{ flex: 1 }}>
                    <Select
                      value={bmiInputSet}
                      onChange={(e) => handleBMISystem(e.target.value)}
                    >
                      {selectedEquation.system.options?.map((opt: string, idx: number) => (
                        <MenuItem key={idx} value={idx}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* BMI inputs (metric/imperial based on selection) */}
                {selectedEquation.inputs[bmiInputSet].map((input: EquationInputData) => (
                  <Box key={input.name} sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, minWidth: "180px" }}>
                      {input.label}
                    </Typography>

                    {input.type === "select" ? (
                      <FormControl sx={{ flex: 1 }}>
                        <Select
                          required
                          value={formData[input.name] || ""}
                          onChange={(e) => handleInputChange(input.name, e.target.value)}
                        >
                          {input.options?.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        required
                        placeholder="Write Here..."
                        type={input.type}
                        value={formData[input.name] || ""}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            ) : (
              // Normal calculators (non-BMI)
              selectedEquation?.inputs.map((input: EquationInputData) => (
                <Box key={input.name} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, minWidth: "180px" }}>
                    {input.label}
                  </Typography>

                  {input.type === "select" ? (
                    <FormControl sx={{ flex: 1 }}>
                      <Select
                        required
                        value={formData[input.name] || ""}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      >
                        {input.options?.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      required
                      placeholder="Write Here..."
                      type={input.type}
                      value={formData[input.name] || ""}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      sx={{ flex: 1 }}
                    />
                  )}
                </Box>
              ))
            )}
          </Box>

          {/* CALCULATE BUTTON */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 3 }}>
            <Button variant="contained" onClick={handleAddCaculation}>
              Calculate
            </Button>
          </Box>

          {/* BMI Result */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            backgroundColor:
            (theme) => theme.palette.mode === "dark" ? "#111111" : "#f8f9fa",
            borderRadius: 3,
            border:
            (theme) => theme.palette.mode === "dark"
                ? "1px solid #333333"
                : "1px solid #e9ecef",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
              fontSize: "18px",
              mb: 3,
            }}
          >
            {selectedEquation?.name}
          </Typography>

          {/* Circular Gauge */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: (theme) => theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "80%",
                  height: "80%",
                  borderRadius: "50%",
                  backgroundColor:
                  (theme) => theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  zIndex: 1,
                },
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  zIndex: 2,
                  position: "relative",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {isSuccess ? result?.value : "--"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) => theme.palette.mode === "dark" ? "#cccccc" : "#000000FF",
                    fontSize: "12px",
                  }}
                >
                  {isSuccess ? result?.unit : "--"}
                </Typography>
              </Box>
            </Box>

            {/* Pointer */}
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                zIndex: 3,
              }}
            />

            {/* Category */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                mt: 1,
              }}
            >
              {isSuccess ? result?.interpretation : ""}
            </Typography>
          </Box>
        </Box>
        </DialogContent>

        {/* FOOTER BUTTONS */}
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuickCalculatorsPopup;
