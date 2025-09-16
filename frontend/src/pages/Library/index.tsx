import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  InputAdornment,
  Collapse,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { PageBreadcrumb, PageMetaData } from "@src/components";
import { libraryMockData, topicsData } from "./mockData";


const Library = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const handleAccordionChange = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredData = libraryMockData.filter(section => {
    const matchesSearch = searchTerm === "" || 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.items.some(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesTopic = selectedTopic === "all" || 
      section.title.toLowerCase().includes(selectedTopic.replace("-", " ")) ||
      section.items.some(item => 
        item.title.toLowerCase().includes(selectedTopic.replace("-", " "))
      );
    
    return matchesSearch && matchesTopic;
  });

  return (
    <>
      <PageMetaData title="Library" />
      <PageBreadcrumb title="Library" subName="" />
      
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          {/* Search and Filter Controls */}
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" }
          }}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="medium"
              sx={{ 
                minWidth: { xs: "100%", sm: 300 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : "#ffffff",
                  height: "48px",
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? '#404040' : "#e0e0e0"
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A"
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LuSearch size={20} color={theme.palette.mode === 'dark' ? '#d4d4d4' : "#999"} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              select
              label="Topic: All"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              size="medium"
              sx={{ 
                minWidth: { xs: "100%", sm: 200 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : "#ffffff",
                  height: "48px",
                  "& fieldset": {
                    borderColor: theme.palette.mode === 'dark' ? '#404040' : "#e0e0e0"
                  },
                  "&:hover fieldset": {
                    borderColor: "#02BE6A"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#02BE6A"
                  }
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === 'dark' ? '#d4d4d4' : "#666",
                  "&.Mui-focused": {
                    color: "#02BE6A"
                  }
                }
              }}
            >
              {topicsData.map((topic) => (
                <MenuItem key={topic.value} value={topic.value}>
                  {topic.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

             {/* Table of Contents Header with Line */}
        <Box sx={{ mb: 3, p: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? '#ffffff' : "#333",
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              mb: 1 // مسافة صغيرة تحت العنوان
            }}
          >
            TABLE OF CONTENTS
          </Typography>

          {/* خط solid نصف الصفحة + dashed line */}
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Box sx={{ flex: 0.5, height: "1px", backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : "#333" }} />
            <Box 
              sx={{
                mt:4,
                flex: 0.5,
                height: "1px",
                backgroundImage: theme.palette.mode === 'dark' 
                  ? "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 0px, transparent 0px, transparent 0px)"
                  : "repeating-linear-gradient(to right, #ddd 0, #ddd 0px, transparent 0px, transparent 0px)"
              }}
            />
          </Box>
        </Box>


        {/* Content Sections */}
        <Box sx={{ width: "100%", p: 0.5 }}>
          {filteredData.map((section) => (
            <Box key={section.id} sx={{ mb: 3 }}>
              {/* Section Header */}
              <Box
                onClick={() => handleAccordionChange(section.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : "#f8f9fa"
                  },
                  p: 1
                }}
              >
                <Box sx={{ flex: 1 }}>

                  <Box sx={{display: "flex", justifyContent: "space-between" ,alignItems:'center', alignSelf:'center'}}>


                   
                  <Typography 

                    variant="h6" 
                    sx={{ 
                      
                      fontWeight: 700, 
                      color: theme.palette.mode === 'dark' ? '#ffffff' : "#333",
                      fontSize: { xs: "1.25rem", md: "1rem" },
                      mb: section.subtitle ? 1 : 0
                    }}
                  >
                    {section.title}
                  </Typography>
  <Box 
    sx={{
      flex: 1,
      mx: 2,
      height: "1px",
      backgroundImage: theme.palette.mode === 'dark' 
        ? "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 2px, transparent 4px, transparent 4px)"
        : "repeating-linear-gradient(to right, #000 0, #000 2px, transparent 4px, transparent 4px)"
    }}
  />

                          <Box sx={{
                  width: 64,
                  height: 32,
                  borderRadius: "10%",
                  backgroundColor: "#02BE6A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transition: "all 0.2s ease"
                }}>
                  <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: 1 }}>
                    {expandedSections.includes(section.id) ? "-" : "+"}
                  </Typography>
                </Box>


                   </Box>
                  {section.subtitle && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? '#d4d4d4' : "#666", 
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        lineHeight: 1.6
                      }}
                    >
                      {section.subtitle.split('\n').map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx < section.subtitle!.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </Typography>
                  )}
                </Box>
                
        
              </Box>
              
     
              <Box
  sx={{
    pl: 2,
    pr: 2,
    overflow: "hidden",
    transition: "all 0.6s ease",
    maxHeight: expandedSections.includes(section.id) ? "1000px" : "0px",
    opacity: expandedSections.includes(section.id) ? 1 : 0,
    transform: expandedSections.includes(section.id)
      ? "translateY(0)"
      : "translateY(-20px)"
  }}
>
              {/* Expanded Content */}
              {expandedSections.includes(section.id) && (
                <Box sx={{ pl: 2, pr: 2    }}>
                  {section.items.map((item) => (
                    <Box key={item.id} sx={{ mb: 2 ,  transition: "all 1s ease" ,transform :expandedSections.includes(section.id) ? "translateY(0)" : "translateY(-100%)" }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.mode === 'dark' ? '#ffffff' : "#333",
                          mb: item.description ? 1 : 0,
                          fontSize: { xs: "1rem", md: "1.1rem" }
                        }}
                      >
                        {item.title}
                      </Typography>
                      {item.description && (
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#d4d4d4' : "#666",
                            fontSize: { xs: "0.9rem", md: "0.95rem" },
                            lineHeight: 1.6
                          }}
                        >
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
                </Box>
          ))}
        </Box>
    

        {/* Results count */}
        {searchTerm && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#d4d4d4' : "#50555c" }}>
              Found {filteredData.length} section{filteredData.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Library;