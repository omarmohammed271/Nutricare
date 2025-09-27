import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Switch,
  Grid,
  useTheme,
  Alert,
  AlertTitle
} from "@mui/material";
import { LuX, LuChevronDown, LuAlertCircle } from "react-icons/lu";
import { useState, useEffect } from "react";

interface NutritionRiskScreeningPopupProps {
  open: boolean;
  onClose: () => void;
  drugData?: any; // Optional drug data prop
}

const NutritionRiskScreeningPopup = ({ open, onClose, drugData }: NutritionRiskScreeningPopupProps) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    screeningTools: "Screening Tools",
    foodIntake: "severe",
    weightLoss: "",
    mobility: "",
    psychologicalStress: true,
    neuropsychological: "",
    bmi: ""
  });
  const [hasData, setHasData] = useState(true);
  const [dataMessage, setDataMessage] = useState("");

  // Check if drug data is available
  useEffect(() => {
    if (drugData !== undefined) {
      if (!drugData || drugData === null || drugData === "" || 
          (typeof drugData === 'object' && Object.keys(drugData).length === 0)) {
        setHasData(false);
        setDataMessage("No available data to show for this drug. Please select a different drug or contact your administrator.");
      } else {
        setHasData(true);
        setDataMessage("");
      }
    }
  }, [drugData]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
          boxShadow: theme.palette.mode === 'dark' 
            ? "0 8px 32px rgba(255,255,255,0.12)" 
            : "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "90vh",
          maxHeight: "90vh",
          width: "95vw",
          maxWidth: "95vw"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb:5
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
          fontSize: "24px"
        }}>
          Nutrition Risk Screening
        </Typography>
        <IconButton onClick={onClose} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, overflow: "visible", flex: 1 }}>
        {/* No Data Alert */}
        {!hasData && (
          <Alert 
            severity="warning" 
            icon={<LuAlertCircle size={20} />}
            sx={{ 
              mb: 3,
              backgroundColor: theme.palette.mode === 'dark' ? "#2d1b00" : "#fff3cd",
              borderColor: theme.palette.mode === 'dark' ? "#ff9800" : "#ffc107",
              "& .MuiAlert-icon": {
                color: theme.palette.mode === 'dark' ? "#ff9800" : "#856404"
              },
              "& .MuiAlert-message": {
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#856404"
              }
            }}
          >
            <AlertTitle sx={{ 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#856404",
              fontWeight: 600
            }}>
              No Data Available
            </AlertTitle>
            {dataMessage}
          </Alert>
        )}

        {/* Screening Tools Dropdown */}
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth disabled={!hasData}>
            <InputLabel sx={{ 
              color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
            }}>
              Screening Tools
            </InputLabel>
            <Select
              value={formData.screeningTools}
              onChange={(e) => handleInputChange("screeningTools", e.target.value)}
              label="Screening Tools"
              sx={{
                borderRadius: 2,
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
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
              <MenuItem value="Screening Tools" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                }
              }}>
                Screening Tools
              </MenuItem>
              <MenuItem value="MNA" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                }
              }}>
                MNA (Mini Nutritional Assessment)
              </MenuItem>
              <MenuItem value="NRS-2002" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                }
              }}>
                NRS-2002
              </MenuItem>
              <MenuItem value="MUST" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                }
              }}>
                MUST (Malnutrition Universal Screening Tool)
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Decrease in food intake */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Decrease in food intake
            </FormLabel>
            <RadioGroup
              value={formData.foodIntake}
              onChange={(e) => handleInputChange("foodIntake", e.target.value)}
              sx={{ gap: 1 }}
            >
              <FormControlLabel
                value="no"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="No decrease in food intake"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="moderate"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="Moderate"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="severe"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="Severe decrease in food intake"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Weight loss during the last 3 months */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Weight loss during the last 3 months
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="3kg"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="> 3 kg"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="1-3kg"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="1 - 3 kg"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="no"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="no weight loss"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="unknown"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="does not know"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>

        {/* Mobility */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Mobility
            </FormLabel>
            <RadioGroup
              value={formData.mobility}
              onChange={(e) => handleInputChange("mobility", e.target.value)}
              sx={{ gap: 1 }}
            >
              <FormControlLabel
                value="bed"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="bed or chair bound"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="limited"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="able to get out of bed / chair but does not go out"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="mobile"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="goes out"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Psychological stress or acute disease */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Has suffered psychological stress or acute disease in the past 3 months?
            </FormLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
                No
              </Typography>
              <Switch
                checked={formData.psychologicalStress}
                onChange={(e) => handleInputChange("psychologicalStress", e.target.checked)}
                disabled={!hasData}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#02BE6A",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#02BE6A",
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
                Yes
              </Typography>
            </Box>
          </FormControl>
        </Box>

        {/* Neuropsychological problems */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Neuropsychological problems
            </FormLabel>
            <RadioGroup
              value={formData.neuropsychological}
              onChange={(e) => handleInputChange("neuropsychological", e.target.value)}
              sx={{ gap: 1 }}
            >
              <FormControlLabel
                value="severe"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="severe dementia or depression"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="mild"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="mild dementia"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
              <FormControlLabel
                value="none"
                control={
                  <Radio 
                    sx={{ 
                      color: "#02BE6A",
                      "&.Mui-checked": { color: "#02BE6A" }
                    }} 
                  />
                }
                label="no psychological problems"
                sx={{ 
                  "& .MuiFormControlLabel-label": { 
                    fontSize: "14px",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Body Mass Index (BMI) */}
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" disabled={!hasData}>
            <FormLabel component="legend" sx={{ 
              fontWeight: 600, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              fontSize: "16px",
              mb: 2
            }}>
              Body Mass Index (BMI)
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="<19"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="BMI < 19"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="19-21"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="19 ≤ BMI < 21"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="21-23"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="21 ≤ BMI < 23"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="≥23"
                  control={
                    <Radio 
                      sx={{ 
                        color: "#02BE6A",
                        "&.Mui-checked": { color: "#02BE6A" }
                      }} 
                    />
                  }
                  label="BMI ≥ 23"
                  sx={{ 
                    "& .MuiFormControlLabel-label": { 
                      fontSize: "14px",
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
                    }
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#02BE6A",
            color: "#02BE6A",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#029e56",
              backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
            }
          }}
        >
          Cancel
        </Button>
        
        <Button
          variant="contained"
          disabled={!hasData}
          sx={{
            backgroundColor: hasData ? "#02BE6A" : "#cccccc",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: hasData ? "#029e56" : "#cccccc",
            }
          }}
        >
          {hasData ? "Evaluation" : "No Data Available"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NutritionRiskScreeningPopup;