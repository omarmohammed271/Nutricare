import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  Container,
  Avatar,
  Breadcrumbs,
  Link,
  Divider,
  Chip
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuCalendar, LuUser, LuShare2, LuBookmark, LuHeart } from "react-icons/lu";
import PageMetaData from "@src/components/PageMetaData";

const BlogPost = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample blog post data
  const blogPost = {
    id: parseInt(id || "1"),
    title: "Where Evidence Becomes Action in Nutrition Practice",
    excerpt: "In today's fast-paced world, nutrition professionals face more than just dietary challenges—they juggle client management, meal planning, progress tracking, and staying updated with the latest guidelines, all while trying to grow a sustainable practice.",
    content: `
      <p>In today's fast-paced world, nutrition professionals face more than just dietary challenges—they juggle client management, meal planning, progress tracking, and staying updated with the latest guidelines, all while trying to grow a sustainable practice.</p>
      
      <p>Enter Nutricare—a smart, all-in-one nutrition platform built for the modern-day dietitian.</p>
      
      <h3>The Shift from Paper to Platform</h3>
      <p>Gone are the days of spreadsheets, handwritten notes, and outdated growth charts. With increasing client demands and a greater need for evidence-based care, dietitians now require tools that are just as dynamic as the science they practice.</p>
      
      <p>Nutricare is more than just a digital record keeper—it's a complete nutrition ecosystem. Whether you're treating a child with growth issues, managing an athlete's macros, or building recovery plans for critical patients, Nutricare helps you deliver personalized care efficiently.</p>
      
      <blockquote>
        "Stay informed. Stay empowered. Every article reflects our commitment to smarter, faster, and more accurate nutrition care."
        <br />
        <cite>- Pedro Domingos</cite>
      </blockquote>
      
      <p>In today's fast-paced world, nutrition professionals face more than just dietary challenges—they juggle client management, meal planning, progress tracking, and staying updated with the latest guidelines, all while trying to grow a sustainable practice.</p>
      
      <p>Enter Nutricare—a smart, all-in-one nutrition platform built for the modern-day dietitian.</p>
      
      <h3>The Shift from Paper to Platform</h3>
      <p>Gone are the days of spreadsheets, handwritten notes, and outdated growth charts. With increasing client demands and a greater need for evidence-based care, dietitians now require tools that are just as dynamic as the science they practice.</p>
      
      <p>"Stay Ahead in Clinical Nutrition—Join hundreds of dietitians receiving evidence-based updates and insights"</p>
    `,
    author: {
      name: "Dr. Octavius",
      title: "Dietitian",
      avatar: "/src/assets/images/avatars/avatar-1.png"
    },
    date: "16 March 2020",
    category: "Nutrition",
    image: "/src/assets/images/browsers/Image Placeholder (1).png",
    tags: ["Nutrition", "Clinical Practice", "Technology", "Healthcare"]
  };

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  return (
    <>
      <PageMetaData title={`${blogPost.title} - NutriCare Blog`} />
      
      <Box sx={{ 
        minHeight: "100vh", 
        backgroundColor: theme.palette.mode === 'dark' ? "#000000" : "#ffffff"
      }}>
        {/* Header Section */}
        <Box sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f8f9fa",
          py: 3,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              mb: 3
            }}>
              <Button
                startIcon={<LuArrowLeft />}
                onClick={handleBackToBlog}
                sx={{ 
                  color: "#02BE6A",
                  textTransform: "none",
                  fontWeight: 600
                }}
              >
                Our Blogs
              </Button>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, backgroundColor: "#02BE6A", borderRadius: "50%" }} />
                  <Box sx={{ width: 8, height: 8, backgroundColor: "#ff6b6b", borderRadius: "50%" }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar 
                    src={blogPost.author.avatar} 
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {blogPost.author.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                      {blogPost.author.title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Typography variant="h2" sx={{ 
              textAlign: "center",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
              mb: 2,
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
            }}>
              {blogPost.title}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              textAlign: "center",
              color: "text.secondary",
              fontSize: "1.1rem"
            }}>
              {blogPost.date}
            </Typography>
          </Container>
        </Box>

        {/* Featured Image */}
        <Box sx={{ py: 4 }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              mb: 4,
              boxShadow: theme.palette.mode === 'dark' ? 3 : 1
            }}>
              <img
                src={blogPost.image}
                alt={blogPost.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </Box>
          </Container>
        </Box>

        {/* Content Section */}
        <Container maxWidth="md" sx={{ pb: 6 }}>
          <Box sx={{ 
            "& p": { 
              fontSize: "1.1rem", 
              lineHeight: 1.8, 
              mb: 3,
              color: theme.palette.mode === 'dark' ? "#e0e0e0" : "#444444"
            },
            "& h3": { 
              fontSize: "1.5rem", 
              fontWeight: 600, 
              mb: 2, 
              mt: 4,
              color: theme.palette.mode === 'dark' ? "#ffffff" : "#2c3e50"
            },
            "& blockquote": {
              borderLeft: "4px solid #02BE6A",
              paddingLeft: 3,
              margin: "2rem 0",
              fontStyle: "italic",
              fontSize: "1.1rem",
              backgroundColor: theme.palette.mode === 'dark' ? "#1a1a1a" : "#f8f9fa",
              padding: 3,
              borderRadius: 1,
              color: theme.palette.mode === 'dark' ? "#e0e0e0" : "#444444"
            },
            "& cite": {
              display: "block",
              marginTop: 1,
              fontWeight: 600,
              color: "#02BE6A"
            }
          }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        </Container>

        {/* Tags Section */}
        <Container maxWidth="md" sx={{ pb: 4 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {blogPost.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A20" : "#02BE6A10",
                  color: "#02BE6A",
                  border: "1px solid #02BE6A30",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#02BE6A30" : "#02BE6A20"
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;