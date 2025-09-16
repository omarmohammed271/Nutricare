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
  Grid
} from "@mui/material";
import { LuX, LuFileText } from "react-icons/lu";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEquations } from "@src/api/admin/adminAPI";

interface QuickCalculatorsPopupProps {
  open: boolean;
  onClose: () => void;
}

const QuickCalculatorsPopup = ({ open, onClose }: QuickCalculatorsPopupProps) => {
  const [formData, setFormData] = useState({
    calculatorType: "BMI",
    age: "",
    gender: "",
    birthDate: "",
    weight: "",
    height: ""
  });

  const [bmiResult, setBmiResult] = useState<number | null>(null);

  // GET Equations
  const { data: equations, isPending, isError } = useQuery({
    queryFn: getEquations,
    queryKey: ['equations']
  })
  console.log(equations);
  

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
    if (!bmi) return { category: "Enter Data", color: "#7f8c8d" };
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
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: "700px"
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2, 
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb:3,
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: "#2c3e50",
          fontSize: "24px"
        }}>
          Quick Calculators
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#7f8c8d" }}>
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
                color: "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Calculator Type
              </Typography>
              <FormControl sx={{ flex: 1 }}>
                <Select
                  value={equations?.[0].code}
                  onChange={(e) => handleInputChange("calculatorType", e.target.value)}
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
                    }
                  }}
                >
                  {
                    equations?.map((eq) => (
                      <MenuItem value={eq.code}>{eq.name}</MenuItem>
                    ))
                  }
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
                color: "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Age
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
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
                color: "#2c3e50",
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
                    backgroundColor: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }}
                >
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
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
                color: "#2c3e50",
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
                    backgroundColor: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#02BE6A",
                    }
                  }}
                >
                  <MenuItem value="" disabled>Select</MenuItem>
                  <MenuItem value="1990">1990</MenuItem>
                  <MenuItem value="1995">1995</MenuItem>
                  <MenuItem value="2000">2000</MenuItem>
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
                color: "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Weight
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
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
                color: "#2c3e50",
                fontWeight: 500,
                minWidth: "120px"
              }}>
                Height
              </Typography>
              <TextField
                placeholder="Write Here..."
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
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
                backgroundColor: "#e0e0e0",
                color: "#9e9e9e",
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
          backgroundColor: "#f8f9fa",
          borderRadius: 3,
          border: "1px solid #e9ecef"
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#2c3e50",
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
                backgroundColor: "#ffffff",
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
                  color: "#2c3e50",
                  fontSize: "24px",
                  lineHeight: 1
                }}>
                  {bmiResult ? bmiResult.toFixed(1) : "--"}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: "#7f8c8d",
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
              borderTop: "8px solid #2c3e50",
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
            <Typography variant="body2" sx={{ color: "#2c3e50" }}>
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
            <Typography variant="body2" sx={{ color: "#2c3e50" }}>
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
            <Typography variant="body2" sx={{ color: "#2c3e50" }}>
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
