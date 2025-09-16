import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Container
} from "@mui/material";
import { LuCalendar, LuUser, LuArrowRight, LuSearch, LuChevronDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import PageMetaData from "@src/components/PageMetaData";

const Blog = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Train Or Bus Journey? Which one suits?",
      excerpt: "The choice between a train or bus journey depends on various factors such as the distance of the journey, the time available, the cost, and person",
      author: "Dr. Sarah Johnson",
      date: "13 March 2023",
      category: "Travel",
      readTime: "5 min read",
      image: "/src/assets/images/browsers/Image Placeholder (1).png"
    },
    {
      id: 2,
      title: "Best Website to research for your next project",
      excerpt: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs",
      author: "Dr. Michael Chen",
      date: "11 March 2023",
      category: "Project Research",
      readTime: "7 min read",
      image: "/src/assets/images/browsers/Image Placeholder (2).png"
    },
    {
      id: 3,
      title: "How to Be a Dancer in 2023 with proper skills?",
      excerpt: "Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment. survival strategies to ensure proactive",
      author: "Dr. Emily Rodriguez",
      date: "10 March 2023",
      category: "Sports",
      readTime: "6 min read",
      image: "/src/assets/images/browsers/Image Placeholder (3).png"
    },
    {
      id: 4,
      title: "Understanding Food-Drug Interactions: A Comprehensive Guide",
      excerpt: "Learn about the critical importance of understanding how food and medications interact in your body, and how to manage these interactions safely.",
      author: "Dr. James Wilson",
      date: "08 March 2023",
      category: "Nutrition",
      readTime: "8 min read",
      image: "/src/assets/images/browsers/Image Placeholder.png"
    },
    {
      id: 5,
      title: "The Role of Nutrition in Medication Management",
      excerpt: "Discover how proper nutrition can enhance medication effectiveness and reduce side effects in your treatment plan.",
      author: "Dr. Lisa Thompson",
      date: "05 March 2023",
      category: "Health",
      readTime: "10 min read",
      image: "/src/assets/images/browsers/Image Placeholder (1).png"
    },
    {
      id: 6,
      title: "Common Drug Interactions You Should Know About",
      excerpt: "Explore the most common drug interactions that can occur and how to prevent them through proper nutrition and timing.",
      author: "Dr. Robert Kim",
      date: "03 March 2023",
      category: "Safety",
      readTime: "6 min read",
      image: "/src/assets/images/browsers/Image Placeholder (2).png"
    }
  ];

  const categories = ["All", "Travel", "Project Research", "Sports", "Nutrition", "Health", "Safety"];

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <>
      <PageMetaData title="Blog - NutriCare" />
      
      <Box sx={{ 
        minHeight: "100vh", 
        backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff",
        p: 4
      }}>
        {/* Header Section */}
        <Box sx={{ 
          textAlign: "center", 
          mb: 6,
          maxWidth: "800px",
          mx: "auto"
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
              mb: 3,
              fontSize: { xs: "32px", md: "48px" },
              lineHeight: 1.2
            }}
          >
            Where Evidence Becomes Action in Nutrition Practice
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.mode === 'dark' ? "#cccccc" : "#666666",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.5
            }}
          >
            Stay informed. Stay empowered. Every article reflects our commitment to smarter, faster, and more accurate nutrition care.
          </Typography>
        </Box>

        {/* Search and Category Section */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 3, 
          mb: 6,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          maxWidth: "600px",
          mx: "auto"
        }}>
          {/* Search Bar */}
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuSearch size={20} color={theme.palette.mode === 'dark' ? "#888888" : "#666666"} />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Category Selector */}
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value="Select Category"
              displayEmpty
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#f8f9fa",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.mode === 'dark' ? "#444444" : "#e0e0e0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#02BE6A",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#02BE6A",
                },
              }}
              IconComponent={LuChevronDown}
            >
              <MenuItem value="Select Category" disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4} sx={{ maxWidth: "1200px", mx: "auto" }}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card
                onClick={() => handlePostClick(post.id)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: theme.palette.mode === 'dark' ? "#111111" : "#ffffff",
                  borderRadius: 3,
                  boxShadow: theme.palette.mode === 'dark' 
                    ? "0 4px 20px rgba(255,255,255,0.05)" 
                    : "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.palette.mode === 'dark' 
                      ? "0 12px 40px rgba(255,255,255,0.1)" 
                      : "0 12px 40px rgba(0,0,0,0.15)"
                  }
                }}
              >
                {/* Blog Image */}
                <Box
                  sx={{
                    height: 240,
                    borderRadius: "12px 12px 0 0",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Category and Date */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                        fontSize: "12px",
                        fontWeight: 500
                      }}
                    >
                      {post.category}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.mode === 'dark' ? "#888888" : "#666666",
                        fontSize: "12px"
                      }}
                    >
                      {post.date}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50",
                      mb: 2,
                      fontSize: "20px",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {post.title}
                  </Typography>

                  {/* Excerpt */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark' ? "#cccccc" : "#666666",
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: "14px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  {/* Read More Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                    sx={{
                      color: "#02BE6A",
                      fontWeight: 600,
                      fontSize: "14px",
                      textTransform: "none",
                      p: 0,
                      justifyContent: "flex-start",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#029e56"
                      }
                    }}
                  >
                    Read More...
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Subscription Footer */}
        <Box sx={{ 
          mt: 8, 
          mb: 4,
          display: "flex",
          justifyContent: "center"
        }}>
          <Box
            sx={{
              backgroundColor: "#02BE6A",
              borderRadius: 4,
              p: 6,
              maxWidth: "800px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, #02BE6A 0%, #029e56 100%)",
                zIndex: 1
              }
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              {/* Main Heading */}
              <Typography
                variant="h4"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: "24px", md: "32px" },
                  lineHeight: 1.3
                }}
              >
                Stay Ahead in Clinical Nutrition — Join hundreds of dietitians receiving evidence-based updates and insights.
              </Typography>

              {/* Email Input and Button */}
              <Box sx={{ 
                display: "flex", 
                gap: 2, 
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "500px",
                mx: "auto"
              }}>
                <TextField
                  placeholder="Your Email"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    minWidth: "250px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#2c3e50",
                      fontSize: "16px",
                      "&::placeholder": {
                        color: "#666666",
                        opacity: 1
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#02BE6A",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "none",
                    minWidth: "140px",
                    height: "56px",
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      color: "#029e56"
                    }
                  }}
                >
                  Get started
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default Blog;
