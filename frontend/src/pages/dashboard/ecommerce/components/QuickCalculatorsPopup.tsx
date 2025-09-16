import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField,
  Select, MenuItem, FormControl, IconButton, Snackbar, Alert
} from "@mui/material";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { equationsConfig } from "./equations"; // import your config
import { useMutation } from "@tanstack/react-query";
import { addCaclulations } from "@src/api/endpoints";

interface QuickCalculatorsPopupProps {
  open: boolean;
  onClose: () => void;
}

const QuickCalculatorsPopup = ({ open, onClose }: QuickCalculatorsPopupProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    calculatorType: "bmi", // default
  });

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [result, setResult] = useState<any>({
    result: 0,
    unit: "kg/m2"
  });

  // POST Calculation
  const { mutate, isSuccess } = useMutation({
    mutationFn: addCaclulations,
    mutationKey: ["new_calculation"],
    onSuccess(data: any) {
      setToast({ open: true, message: "Calculation added successfully!", severity: "success" });
      console.log(data.data.result);
      setResult(data.data.result);
    },
    onError(err: any) {
      setToast({ open: true, message: "Failed to add calculation.", severity: "error" });
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // get the currently selected equation config
  const selectedEquation = equationsConfig.find(
    (eq) => eq.code === formData.calculatorType
  );

  const handleAddCaculation = () => {
    if (!selectedEquation) return;
  
    // Build inputs object
    const inputs: { [key: string]: string | number } = {};
    selectedEquation.inputs.forEach((input) => {
      if (formData[input.name]) {
        inputs[input.name] =
          input.type === "number" ? Number(formData[input.name]) : formData[input.name];
      }
    });
  
    const payload = {
      equation: selectedEquation.id, // use id instead of code
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
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "700px",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 2,
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            fontSize: "24px",
          }}
        >
          Quick Calculators
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 4 }}>
        {/* Calculator Type */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#2c3e50",
              fontWeight: 500,
              mb: 1,
            }}
          >
            Calculator Type
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.calculatorType}
              onChange={(e) => handleInputChange("calculatorType", e.target.value)}
              sx={{
                borderRadius: 2,
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#02BE6A",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#02BE6A",
                },
              }}
            >
              {equationsConfig.map((eq) => (
                <MenuItem key={eq.code} value={eq.code}>
                  {eq.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Dynamic Inputs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {selectedEquation?.inputs.map((input) => (
            <Box
              key={input.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#2c3e50",
                  fontWeight: 500,
                  minWidth: "180px",
                }}
              >
                {input.label}
              </Typography>

              {input.type === "select" ? (
                <FormControl sx={{ flex: 1 }}>
                  <Select
                    value={formData[input.name] || ""}
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                    displayEmpty
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#ffffff",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#02BE6A",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#02BE6A",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    {input.options?.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  placeholder="Write Here..."
                  type={input.type}
                  value={formData[input.name] || ""}
                  onChange={(e) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#02BE6A",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#02BE6A",
                      },
                    },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Calculate Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleAddCaculation}
            sx={{
              backgroundColor: "#02BE6A",
              color: "white",
              marginTop: 4,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#029e56" },
              "&:disabled": {
                backgroundColor:
                (theme) => theme.palette.mode === "dark" ? "#333333" : "#e0e0e0",
                color: (theme) => theme.palette.mode === "dark" ? "#666666" : "#9e9e9e",
              },
            }}
          >
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
                    color: (theme) => theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
                    fontSize: "24px",
                    lineHeight: 1,
                  }}
                >
                  {isSuccess ? result.value : "--"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) => theme.palette.mode === "dark" ? "#cccccc" : "#000000FF",
                    fontSize: "12px",
                  }}
                >
                  {isSuccess ? result.unit : "--"}
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
              {}
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FFA726",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
              }}
            >
              Under
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
              }}
            >
              Normal
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#F44336",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
              }}
            >
              Over
            </Typography>
          </Box>
        </Box> */}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#e0e0e0",
            color: "#2c3e50",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#02BE6A",
              backgroundColor: "#f8f9fa",
            },
          }}
        >
          Close
        </Button>

        
      </DialogActions>
    </Dialog>

    {/* Snackbar for toaster */}
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={() => setToast(prev => ({ ...prev, open: false }))}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={() => setToast(prev => ({ ...prev, open: false }))} severity={toast.severity} sx={{ width: '100%' }}>
        {toast.message}
      </Alert>
    </Snackbar>
    </>
  );
};

export default QuickCalculatorsPopup;
