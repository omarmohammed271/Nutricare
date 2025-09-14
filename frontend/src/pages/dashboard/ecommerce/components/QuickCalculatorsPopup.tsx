import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  useTheme
} from "@mui/material";
import { LuX, LuFileText } from "react-icons/lu";
import { useState } from "react";

interface QuickCalculatorsPopupProps {
  open: boolean;
  onClose: () => void;
}

const QuickCalculatorsPopup = ({ open, onClose }: QuickCalculatorsPopupProps) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    calculatorType: "BMI",
    age: "",
    gender: "",
    birthDate: "",
    weight: "",
    height: ""
  });

  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calculateBMI = (weight: number, height: number) => {
    if (weight && height && height > 0) {
      return weight / ((height / 100) ** 2);
    }
    return null;
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(newFormData);
    
    // Calculate BMI when weight and height are provided
    if (field === "weight" || field === "height") {
      const weight = field === "weight" ? parseFloat(value) : parseFloat(newFormData.weight);
      const height = field === "height" ? parseFloat(value) : parseFloat(newFormData.height);
      
      const bmi = calculateBMI(weight, height);
      setBmiResult(bmi);
    }
  };

  const getBmiCategory = (bmi: number | null) => {
    if (!bmi) return { category: "Enter Data", color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" };
    if (bmi < 18.5) return { category: "Under", color: "#FFA726" };
    if (bmi >= 18.5 && bmi < 25) return { category: "Normal", color: "#4CAF50" };
    return { category: "Over", color: "#F44336" };
  };

  const bmiCategory = getBmiCategory(bmiResult);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
          boxShadow: theme.palette.mode === 'dark' 
            ? "0 8px 32px rgba(255,255,255,0.12)" 
            : "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "700px"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb:3,
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
          fontSize: "24px"
        }}>
          Quick Calculators
        </Typography>
        <IconButton onClick={onClose} sx={{ color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d" }}>
          <LuX size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 4 }}>


        {/* Calculator Form */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Calculator Type */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Calculator Type
              </Typography>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  value={formData.calculatorType}
                  onChange={(e) => handleInputChange("calculatorType", e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }}
                >
                  <MenuItem value="BMI" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    BMI
                  </MenuItem>
                  <MenuItem value="BMR" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    BMR
                  </MenuItem>
                  <MenuItem value="Body Fat" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    Body Fat
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Age */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Age
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                InputProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                  }
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }
                }}
              />
            </Box>

            {/* Gender */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Gender
              </Typography>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }}
                >
                  <MenuItem value="" disabled sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  }}>
                    Select
                  </MenuItem>
                  <MenuItem value="male" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    Male
                  </MenuItem>
                  <MenuItem value="female" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    Female
                  </MenuItem>
                  <MenuItem value="other" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    Other
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Birth Date */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Birth Date
              </Typography>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }}
                >
                  <MenuItem value="" disabled sx={{ 
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                  }}>
                    Select
                  </MenuItem>
                  <MenuItem value="1990" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    1990
                  </MenuItem>
                  <MenuItem value="1995" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    1995
                  </MenuItem>
                  <MenuItem value="2000" sx={{ 
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                    backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f5f5f5",
                    }
                  }}>
                    2000
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Weight */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Weight
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                InputProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                  }
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }
                }}
              />
            </Box>

            {/* Height */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              gap: 3
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Height
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                InputProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#ffffff" : "#000000",
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: theme.palette.mode === 'dark' ? "#cccccc" : "#000000",
                  }
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Calculate Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => {
              const weight = parseFloat(formData.weight);
              const height = parseFloat(formData.height);
              const bmi = calculateBMI(weight, height);
              setBmiResult(bmi);
            }}
            disabled={!formData.weight || !formData.height}
            sx={{
              backgroundColor: "#02BE6A",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#029e56",
              },
              "&:disabled": {
                backgroundColor: theme.palette.mode === 'dark' ? "#333333" : "#e0e0e0",
                color: theme.palette.mode === 'dark' ? "#666666" : "#9e9e9e",
              }
            }}
          >
            Calculate BMI
          </Button>
        </Box>

        {/* BMI Result Section */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
          borderRadius: 3,
          border: theme.palette.mode === 'dark' ? "1px solid #333333" : "1px solid #e9ecef"
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            fontSize: "18px",
            mb: 3
          }}>
            BMI
          </Typography>

          {/* Circular Gauge */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            position: "relative"
          }}>
            {/* Circular Progress */}
            <Box sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `conic-gradient(
                #FFA726 0deg 60deg,
                #F44336 60deg 120deg,
                #4CAF50 120deg 360deg
              )`,
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
                backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
                zIndex: 1
              }
            }}>
              <Box sx={{ 
                textAlign: "center", 
                zIndex: 2,
                position: "relative"
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                  fontSize: "24px",
                  lineHeight: 1
                }}>
                  {bmiResult ? bmiResult.toFixed(1) : "--"}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.mode === 'dark' ? "#cccccc" : "#7f8c8d",
                  fontSize: "12px"
                }}>
                  kg/m²
                </Typography>
              </Box>
            </Box>

            {/* Pointer */}
            <Box sx={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `8px solid ${theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"}`,
              zIndex: 3
            }} />

            {/* Category */}
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: bmiCategory.color,
              fontSize: "16px",
              mt: 1
            }}>
              {bmiCategory.category}
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 3, 
          mt: 3 
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FFA726"
            }} />
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
              Under
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#4CAF50"
            }} />
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
              Normal
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#F44336"
            }} />
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50" }}>
              Over
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
            color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#02BE6A",
              backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickCalculatorsPopup;