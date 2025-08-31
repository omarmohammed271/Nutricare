import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { PageBreadcrumb } from "@src/components";

// images
import img1 from "@src/assets/images/small/small-1.jpg";
import img2 from "@src/assets/images/small/small-2.jpg";
import img3 from "@src/assets/images/small/small-3.jpg";
import { Fragment } from "react";
import { LuCircleDot } from "react-icons/lu";

type TimelineData = {
  [key: string]: {
    title: string;
    date: string;
    text: string;
    variant: string;
    reactions?: {
      emoji: string;
      count: string;
    }[];
    images?: string[];
    avatar?: {
      position: string;
      name: string;
      image: string;
    }[];
  }[];
};

const Timeline = () => {
  const timelineData: TimelineData = {
    Today: [
      {
        title: "Completed UX design project for our client",
        date: "22 July, 2019",
        text: "Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?",
        variant: "#ff6d3c",
        reactions: [
          {
            emoji: "👍",
            count: "17",
          },
          {
            emoji: "❤️",
            count: "89",
          },
        ],
      },
      {
        title: "Yay! We are celebrating our first admin release.",
        date: "22 July, 2019",
        text: "Consectetur adipisicing elit. Iusto, optio, dolorum John deon provident rerum aut hic quasi placeat iure tempora laudantium",
        variant: "#15d1e9",
        reactions: [
          {
            emoji: "🎉",
            count: "148",
          },
        ],
      },
    ],
    Yesterday: [
      {
        title: "We released new version of our theme Attex.",
        date: "22 July, 2019",
        text: "3 new photo Uploaded on facebook fan page",
        variant: "#ffbc00",
        images: [img1, img2, img3],
        reactions: [
          {
            emoji: "🏆",
            count: "94",
          },
        ],
      },
      {
        title: "We have archieved 25k sales in our themes.",
        date: "22 July, 2019",
        text: "Outdoor visit at California State Route 85 with John Boltana & Harry Piterson regarding to setup a new show room.",
        variant: "#23c9b2",
        reactions: [
          {
            emoji: "👍",
            count: "1.4k",
          },
          {
            emoji: "🎉",
            count: "2k",
          },
        ],
      },
      {
        title: "Conference call with UX team",
        date: "22 July, 2019",
        text: "Jonatha Smith added new milestone Pathek Lorem ipsum dolor sit amet consiquest dio",
        variant: "#3e60d5",
        reactions: [
          {
            emoji: "❤️",
            count: "89",
          },
        ],
      },
    ],
    "Last Month": [
      {
        title: "Join new team member Alex Smith",
        date: "10 December, 2018",
        text: "Alex Smith is a Senior Software (Full Stack) engineer with a deep passion for building usable, functional & pretty web applications.",
        variant: "#ff6d3c",
        avatar: [
          {
            image: "@src/assets/images/users/avatar-3.jpg",
            name: "Alex Smith",
            position: "Senior Software (Full Stack)",
          },
        ],
      },
      {
        title: "First release of Attex admin dashboard template",
        date: "05 May, 2023",
        text: "Outdoor visit at California State Route 85 with John Boltana & Harry Piterson regarding to setup a new show room.",
        variant: "#3e60d5",
        reactions: [
          {
            emoji: "🎉",
            count: "10k",
          },
          {
            emoji: "👍",
            count: "3.2k",
          },
          {
            emoji: "❤️",
            count: "7.1k",
          },
        ],
      },
    ],
  };
  return (
    <>
      <PageBreadcrumb title="Timeline" subName="Extra Pages" />
      <Box sx={{ "& > *:not(:first-child)": { mt: 8 }, position: "relative", pb: "24px" }}>
        <Box
          sx={{
            position: "absolute",
            border: "1px solid",
            borderColor: "divider",
            height: "100%",
            top: 1,
            left: "40px",
            insetInlineStart: { md: "50%" },
            translate: "-50%",
            zIndex: 0,
          }}
        />
        {Object.keys(timelineData).map((day, idx) => {
          return (
            <Fragment key={idx}>
              <Box sx={{ textAlign: { md: "center" } }}>
                <Button
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  disableElevation
                  color="secondary"
                  sx={{
                    "&:hover": { backgroundColor: "secondary.main" },
                    py: "6px",
                    px: "14px",
                    display: "inline",
                    borderRadius: "4px",
                  }}
                  component={"h5"}>
                  {day}
                </Button>
              </Box>
              {(timelineData[day] || []).map((item, idx) => {
                return idx % 2 === 0 ? (
                  <Box key={idx} sx={{ textAlign: { md: "end", xs: "left" } }}>
                    <Box sx={{ position: "absolute", left: { xs: "40px", md: "50%" }, translate: "-50%", mt: "24px" }}>
                      <Box
                        sx={{
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "100%",
                          bgcolor: item.variant,
                        }}>
                        <LuCircleDot color="white" size={20} />
                      </Box>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                      <Box sx={{ gridColumn: { md: "span 1 / span 1", xs: "span 2 / span 2" } }}>
                        <Box
                          sx={{ position: "relative", marginInlineEnd: { md: "40px" }, ml: { md: "0px", xs: "80px" } }}>
                          <Card>
                            <CardContent sx={{ backgroundColor: "grey.50" }}>
                              <Typography
                                component={"h4"}
                                sx={{ mb: "6px", fontSize: "16px", lineHeight: "24px" }}
                                color={"grey.700"}>
                                {item.title}
                              </Typography>
                              <Typography component={"p"} mb={"16px"} color={"grey.600"} fontSize={"12px"}>
                                {item.date}
                              </Typography>
                              <Typography component={"p"} sx={{ color: "grey.600", mb: "16px" }}>
                                {item.text}
                              </Typography>
                              {item.images && (
                                <Box
                                  sx={{
                                    mb: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    justifyContent: { md: "end" },
                                  }}>
                                  {(item.images || []).map((img, idx) => {
                                    return (
                                      <Avatar
                                        key={idx}
                                        variant="rounded"
                                        src={img}
                                        sx={{ height: "36px", width: "60px" }}
                                      />
                                    );
                                  })}
                                </Box>
                              )}
                              {item.reactions && (
                                <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "start", md: "end" } }}>
                                  {(item.reactions || []).map((item, idx) => {
                                    return (
                                      <Button
                                        variant="contained"
                                        key={idx}
                                        size="small"
                                        startIcon={item.emoji}
                                        color="secondary">
                                        {item.count}
                                      </Button>
                                    );
                                  })}
                                </Box>
                              )}
                              {item.avatar && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                  {(item.avatar || []).map((item, idx) => {
                                    return (
                                      <Fragment key={idx}>
                                        <Avatar
                                          src={item.image}
                                          alt="Arya S"
                                          variant="circular"
                                          sx={{ mr: "12px", height: "24px", width: "24px" }}
                                        />
                                        <Box>
                                          <Typography component={"h5"} sx={{ mt: "6px", color: "text.secondary" }}>
                                            {item.name} <small>- {item.position}</small>
                                          </Typography>
                                        </Box>
                                      </Fragment>
                                    );
                                  })}
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                          <Box
                            sx={{
                              bgcolor: "grey.50",
                              position: "absolute",
                              height: "16px",
                              width: "16px",
                              rotate: "45deg",
                              borderRadius: "2px",
                              right: { md: "-8px" },
                              top: "28px",
                              left: { md: "auto", xs: "-8px" },
                            }}></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box key={idx} sx={{ textAlign: "left" }}>
                    <Box sx={{ position: "absolute", left: { xs: "40px", md: "50%" }, translate: "-50%", mt: "24px" }}>
                      <Box
                        sx={{
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "100%",
                          bgcolor: item.variant,
                        }}>
                        <LuCircleDot color="white" size={20} />
                      </Box>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                      <Box sx={{ gridColumn: "span 2 / span 2", gridColumnStart: { md: 2 } }}>
                        <Box sx={{ position: "relative", ml: "80px" }}>
                          <Card>
                            <CardContent sx={{ backgroundColor: "grey.50" }}>
                              <Typography
                                component={"h4"}
                                sx={{ mb: "6px", fontSize: "16px", lineHeight: "24px" }}
                                color={"grey.700"}>
                                {item.title}
                              </Typography>
                              <Typography component={"p"} mb={"16px"} color={"grey.600"} fontSize={"12px"}>
                                {item.date}
                              </Typography>
                              <Typography component={"p"} sx={{ color: "grey.600", mb: "16px" }}>
                                {item.text}
                              </Typography>
                              {item.images && (
                                <Box
                                  sx={{
                                    mb: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    justifyContent: { md: "end" },
                                  }}>
                                  {(item.images || []).map((img, idx) => {
                                    return (
                                      <Avatar
                                        key={idx}
                                        variant="rounded"
                                        src={img}
                                        sx={{ height: "36px", width: "60px" }}
                                      />
                                    );
                                  })}
                                </Box>
                              )}
                              {item.reactions && (
                                <Box sx={{ display: "flex", gap: 1, justifyContent: "start" }}>
                                  {(item.reactions || []).map((item, idx) => {
                                    return (
                                      <Button
                                        variant="contained"
                                        key={idx}
                                        size="small"
                                        startIcon={item.emoji}
                                        color="secondary">
                                        {item.count}
                                      </Button>
                                    );
                                  })}
                                </Box>
                              )}
                              {item.avatar && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                  {(item.avatar || []).map((item, idx) => {
                                    return (
                                      <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar
                                          src={item.image}
                                          alt="Arya S"
                                          variant="circular"
                                          sx={{ mr: "12px", height: "24px", width: "24px" }}
                                        />
                                        <Box>
                                          <Typography component={"h5"} sx={{ mt: "6px", color: "text.secondary" }}>
                                            {item.name} <small>- {item.position}</small>
                                          </Typography>
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                          <Box
                            sx={{
                              bgcolor: "grey.50",
                              position: "absolute",
                              height: "16px",
                              width: "16px",
                              rotate: "45deg",
                              borderRadius: "2px",
                              left: "-8px",
                              top: "28px",
                            }}></Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Fragment>
          );
        })}
      </Box>
    </>
  );
};

export default Timeline;
