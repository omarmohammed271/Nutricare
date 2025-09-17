import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField,
  Select, MenuItem, FormControl, IconButton, Snackbar, Alert,
  ListSubheader
} from "@mui/material";
import { LuX } from "react-icons/lu";
import { useMemo, useState } from "react";
import { equationsConfig } from "./equations"; // import your config
import { useMutation } from "@tanstack/react-query";
import { addCaclulations } from "@src/api/endpoints";
import React from "react";

interface QuickCalculatorsPopupProps {
  open: boolean;
  onClose: () => void;
}

interface EquationInputData{
  name: string, label: string, type: string, options?: [string]
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

  const [result, setResult] = useState<{value: string, unit: string, interpretation?: string}>();

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

  // flatten equations once
  const allEquations = useMemo(
    () => equationsConfig.flatMap((cat) => cat.equations),
    []
  );

  const [bmiInputSet, setBmiInputSet] = useState(0);

  const handleBMISystem = (value: string | number) => {
    console.log(value);
    setBmiInputSet(value as number);
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // get the currently selected equation config
  const selectedEquation: any = allEquations.find(
    (eq) => eq.code === formData.calculatorType
  );

  const handleAddCaculation = () => {
    if (!selectedEquation) return;
  
    // Build inputs object
    const inputs: { [key: string]: string | number } = {};
    let availableInputs;
    
    if ( selectedEquation.code == "bmi" ){
      availableInputs = selectedEquation.inputs[bmiInputSet]
    } else {
      availableInputs = selectedEquation.inputs
    }

    availableInputs.forEach((input: EquationInputData) => {
      if (formData[input.name]) {
        inputs[input.name] =
          input.type === "number" ? Number(formData[input.name]) : formData[input.name];
      }
    });
  
    const payload = {
      equation: selectedEquation.id, // use id instead of code
      inputs,
    };

    console.log(payload);
    

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
      <DialogTitle
        sx={{
          pb: 2,
          borderBottom: (theme) => theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
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
            fontSize: "24px",
          }}
        >
          Quick Calculators
        </Typography>
        <IconButton onClick={onClose}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 4 }}>
        {/* Calculator Type */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{
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
                "& .MuiOutlinedInput-root": {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A",
                  },
                }
              }}
            >
              {equationsConfig.map((category) => [
                <ListSubheader key={category.id} 
                sx={{ fontWeight: 600, 
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#1a1a1a" : "#f5f5f5",
                  color: (theme) => theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
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

        {/* Dynamic Inputs */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {
            selectedEquation.code == "bmi" ? (
              <Box>
                <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 3,
                      marginBottom: 2
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        minWidth: "180px",
                      }}
                    >
                      Input System
                    </Typography>
    
                    <FormControl sx={{ width: '100%', marginBottom: 2 }}>
                      <Select
                        value={bmiInputSet}
                        onChange={(e) =>
                          handleBMISystem(e.target.value)
                        }
                        displayEmpty
                        sx={{
                          flex: 1,
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#02BE6A",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#02BE6A",
                            },
                          }
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        {selectedEquation.system.options?.map((opt: string, idx: number) => (
                          <MenuItem key={idx} value={idx}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
              {
                selectedEquation?.inputs[bmiInputSet].map((input: EquationInputData) => (
                  <Box
                    key={input.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 3,
                      marginBottom: 2
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
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
                            flex: 1,
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                              borderRadius: 2,
                              "& fieldset": {
                                borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                              },
                              "&:hover fieldset": {
                                borderColor: "#02BE6A",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#02BE6A",
                              },
                            }
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
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#02BE6A",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#02BE6A",
                            },
                          }
                        }}
                      />
                    )}
                  </Box>
                ))  
              }     
              </Box>
            ) : (
              
            selectedEquation?.inputs.map((input: EquationInputData) => (
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
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#02BE6A",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#02BE6A",
                          },
                        }
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
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: (theme) => theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#02BE6A",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#02BE6A",
                        },
                      }
                    }}
                  />
                )}
              </Box>
            ))
            )
          }
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

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
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
