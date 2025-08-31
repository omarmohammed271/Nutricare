import { Avatar, Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";

//images
import avatar3 from "@src/assets/images/users/avatar-3.jpg";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";
import { LuAtSign, LuLoader, LuReply, LuSendHorizonal, LuUpload } from "react-icons/lu";

const Comments = () => {
  return (
    <Card sx={{ p: "24px" }}>
      <Typography component={"h4"}>Comments (51)</Typography>

      <Box sx={{ mt: "28px" }}>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Avatar variant="circular" src={avatar3} sx={{ height: "32px", width: "32px" }} />
          <Box width={"100%"}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography component={"h5"} sx={{ mb: "8px", color: "grey.700", fontWeight: 500, fontSize: "13px" }}>
                  Jeremy Tomlinson
                </Typography>
              </Box>
              <Typography component={"p"} sx={{ color: "grey.700", fontSize: "10px", fontWeight: 500 }}>
                5 hours ago
              </Typography>
            </Box>
            <Typography component={"p"} sx={{ color: "grey.600", fontSize: "13px" }}>
              Nice work, makes me think of The Money Pit.
            </Typography>
            <Button size="small" variant="text" color="secondary" startIcon={<LuReply size={16} />} sx={{ mt: "8px" }}>
              
              Reply
            </Button>

            <Box sx={{ mt: "20px" }}>
              <Box sx={{ display: "flex", gap: "12px" }}>
                <Avatar variant="circular" src={avatar4} sx={{ height: "32px", width: "32px" }} />
                <Box width={"100%"}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography
                        component={"h5"}
                        sx={{ mb: "8px", color: "grey.700", fontWeight: 500, fontSize: "13px" }}>
                        Thelma Fridley
                      </Typography>
                    </Box>
                    <Typography component={"p"} sx={{ color: "grey.700", fontSize: "10px", fontWeight: 500 }}>
                      5 hours ago
                    </Typography>
                  </Box>
                  <Typography component={"p"} sx={{ color: "grey.600", fontSize: "13px" }}>
                    i'm in the middle of a timelapse animation myself! (Very different though.) Awesome stuff.
                  </Typography>
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    startIcon={<LuReply size={16} />}
                    sx={{ mt: "8px" }}>
                    
                    Reply
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Avatar variant="circular" src={avatar3} sx={{ height: "32px", width: "32px" }} />
            <Box width={"100%"}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography component={"h5"} sx={{ mb: "8px", color: "grey.700", fontWeight: 500, fontSize: "13px" }}>
                    Kevin Martinez
                  </Typography>
                </Box>
                <Typography component={"p"} sx={{ color: "grey.700", fontSize: "10px", fontWeight: 500 }}>
                  1 day ago
                </Typography>
              </Box>
              <Typography component={"p"} sx={{ color: "grey.600", fontSize: "13px" }}>
                It would be very nice to have.
              </Typography>
              <Button
                size="small"
                variant="text"
                color="secondary"
                startIcon={<LuReply size={16} />}
                sx={{ mt: "8px" }}>
                
                Reply
              </Button>
            </Box>
          </Box>
        </Box>
        <Box textAlign={"center"} mt={"12px"}>
          <Button
            size="small"
            color="error"
            sx={{
              "& > svg": {
                "@keyframes spin": {
                  from: {
                    transform: "rotate(0deg)",
                  },
                  to: {
                    transform: "rotate(360deg)",
                  },
                },
              },
            }}
            startIcon={<LuLoader size={16} style={{ marginRight: "6px", animation: "spin 1.5s linear infinite" }} />}>
            Load More
          </Button>
        </Box>
        <Box sx={{ border: "1px solid divider", borderRadius: "5px", mt: "28px" }}>
          <TextField id="outlined-multiline-static" placeholder="Your Comment..." rows={3} multiline fullWidth />
          <Box
            sx={{
              p: "8px",
              bgcolor: "grey.100",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Box>
              <IconButton sx={{ px: "8px", mr: "12px" }}>
                <LuUpload size={16} />
              </IconButton>
              <IconButton sx={{ px: "8px" }}>
                <LuAtSign size={16} />
              </IconButton>
            </Box>
            <Button variant="contained" startIcon={<LuSendHorizonal size={16} />} size="medium" color="secondary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Comments;
