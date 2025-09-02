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

  const [bmiResult, setBmiResult] = useState(22.2);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Calculate BMI when weight and height are provided
    if (field === "weight" || field === "height") {
      const weight = field === "weight" ? parseFloat(value) : parseFloat(formData.weight);
      const height = field === "height" ? parseFloat(value) : parseFloat(formData.height);
      
      if (weight && height && height > 0) {
        const bmi = weight / ((height / 100) ** 2);
        setBmiResult(bmi);
      }
    }
  };

  const getBmiCategory = (bmi: number) => {
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
        alignItems: "center"
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

      <DialogContent sx={{ p: 3 }}>
        {/* Header Buttons */}
        <Box sx={{ 
          display: "flex", 
          gap: 2, 
          mb: 4 
        }}>
          <Button
            variant="contained"
            startIcon={<LuFileText size={16} />}
            sx={{
              backgroundColor: "#4285F4",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: "20px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#3367D6",
              }
            }}
          >
            115 Hug
          </Button>
          
          <Button
            variant="contained"
            startIcon={<LuFileText size={16} />}
            sx={{
              backgroundColor: "#4285F4",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: "20px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#3367D6",
              }
            }}
          >
            17 Hug
          </Button>
        </Box>

        {/* Calculator Form */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            {/* Calculator Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Calculator Type</InputLabel>
                <Select
                  value={formData.calculatorType}
                  onChange={(e) => handleInputChange("calculatorType", e.target.value)}
                  label="Calculator Type"
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                    }
                  }}
                >
                  <MenuItem value="BMI">BMI</MenuItem>
                  <MenuItem value="BMR">BMR</MenuItem>
                  <MenuItem value="Body Fat">Body Fat</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                placeholder="Write Here..."
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  label="Gender"
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                    }
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Birth Date */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Birth Date</InputLabel>
                <Select
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  label="Birth Date"
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                    }
                  }}
                >
                  <MenuItem value="1990">1990</MenuItem>
                  <MenuItem value="1995">1995</MenuItem>
                  <MenuItem value="2000">2000</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Weight */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                placeholder="Write Here..."
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>

            {/* Height */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                placeholder="Write Here..."
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* BMI Result Section */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          p: 3,
          backgroundColor: "#f8f9fa",
          borderRadius: 3,
          border: "1px solid #e9ecef"
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: "#2c3e50",
            fontSize: "18px"
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
                #F44336 0deg 120deg,
                #FFA726 120deg 240deg,
                #4CAF50 240deg 360deg
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
                  {bmiResult.toFixed(1)}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: "#7f8c8d",
                  fontSize: "12px"
                }}>
                  kg/m²
                </Typography>
              </Box>
            </Box>

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
