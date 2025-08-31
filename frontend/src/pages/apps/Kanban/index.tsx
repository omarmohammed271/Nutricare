import { KeyboardEvent, ReactNode } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { LuAtSign, LuPlus, LuReply, LuSendHorizonal, LuUpload, LuX } from "react-icons/lu";
import TaskItem from "./TaskItem";
import { CustomDatepicker, FormInput, HorizontalFilePreview, PageBreadcrumb, SelectInput } from "@src/components";
import useKanban from "./useKanban";
import { assignees } from "./helper";
import { useTabsChange } from "@src/hooks";
import { staticAttachments } from "../tasks/Details/Attachments";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

type TaskDescriptionProps = {
  descriptionModal: boolean;
  toggleDescriptionModal: () => void;
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return value === index && <Stack sx={{ gap: 2, mt: 2 }}>{children}</Stack>;
};

const TaskDescription = ({ descriptionModal, toggleDescriptionModal }: TaskDescriptionProps) => {
  const { value, handleChange } = useTabsChange();

  return (
    <Dialog open={descriptionModal} onClose={toggleDescriptionModal} maxWidth={"lg"} fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ display: "flex", gap: 1 }}>
          iOS App home page
          <Typography
            variant="caption"
            sx={{
              py: "2px",
              px: "6px",
              borderRadius: "4px",
              bgcolor: "error.lighter",
              color: "error.main",
              marginInlineStart: "auto",
            }}>
            High
          </Typography>
        </Typography>
        <IconButton onClick={toggleDescriptionModal}>
          <LuX />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ overflowY: "auto" }} dividers>
        <Typography variant="subtitle1" gutterBottom>
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus
          asperiores libero voluptas quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
          supporting text below as a natural lead-in to additional contenposuere erat a ante.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", my: "28px" }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Create Date
            </Typography>
            <Typography variant="body2" color="text.secondary">
              17 March 2023 <small>1:00 PM</small>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Due Date
            </Typography>
            <Typography variant="body2" color="text.secondary">
              22 December 2023 <small>1:00 PM</small>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Assignee:
            </Typography>
            <Box sx={{ display: "flex" }}>
              {assignees.slice(0, 3).map((assignee, idx) => (
                <Tooltip title={assignee.title} key={idx}>
                  <Avatar
                    src={assignee.image}
                    alt={assignee.title}
                    sx={{
                      height: "32px",
                      width: "32px",
                      marginInlineEnd: "-12px",
                      transitionProperty: "all",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDuration: "200ms",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ borderBottom: 1, borderColor: "divider", borderBottomStyle: "solid" }}>
            <Tab value={1} label="Comments" />
            <Tab value={2} label="Files" />
          </Tabs>
          <CustomTabPanel value={value} index={1}>
            <Box sx={{ border: "1px solid divider", borderRadius: "5px" }}>
              <TextField id="outlined-multiline-static" rows={3} placeholder="Your Comment..." multiline fullWidth />
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

            <Box sx={{ width: "100%", mt: 1 }}>
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
              <Button
                size="small"
                variant="text"
                color="secondary"
                startIcon={<LuReply size={16} />}
                sx={{ mt: "8px" }}>
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {staticAttachments.map((file, idx) => (
              <HorizontalFilePreview file={file} key={idx} />
            ))}
          </CustomTabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const SimpleBarStyled = styled(SimpleBar)({
  height: "calc(100% - 48px)",
  "& .simplebar-content": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px !important",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    px: "4px",
    "&:before": {
      overflow: "hidden",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      insetInlineStart: "50%",
      transform: "translate(-50%)",
      height: "96px",
      textAlign: "center",
      zIndex: -10,
    },
  },
});

const Kanban = () => {
  const {
    onDragEnd,
    getTasks,
    sections,
    toggleDescriptionModal,
    newTask,
    newTaskModal,
    toggleNewTaskModal,
    handleNewTask,
    control,
    newTaskDetails,
    handleDateChange,
    selectedSection,
    setSelectedSection,
    descriptionModal,
    onChangeSectionTitle,
    onAddSection,
  } = useKanban();

  return (
    <>
      <PageBreadcrumb title="Kanban" subName="Apps" />

      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: "24px",
              paddingBottom: "16px",
              height: "calc(100vh - 165px)",
            }}>
            {sections.map((section) => (
              <Droppable droppableId={section.id} key={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pt: "16px",
                      flexShrink: 0,
                      width: 320,
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderRadius: "6px",
                      borderColor: "divider",
                    }}
                    {...provided.droppableProps}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
                      {selectedSection != section ? (
                        <Typography
                          variant="h6"
                          sx={{ color: "grey.800", cursor: "pointer" }}
                          onClick={() => setSelectedSection(section)}>
                          {section.title} ({getTasks(section.id).length})
                        </Typography>
                      ) : (
                        <TextField
                          size={"small"}
                          value={section.title}
                          onChange={onChangeSectionTitle}
                          onBlur={() => setSelectedSection(null)}
                          onKeyDownCapture={(event: KeyboardEvent<HTMLInputElement>) => event.key == 'Enter' && setSelectedSection(null)}
                          autoFocus/>
                      )}
                      <IconButton onClick={() => newTask(section.id)} sx={{ marginRight: "8px" }}>
                        <LuPlus />
                      </IconButton>
                    </Box>

                    <SimpleBarStyled>
                      {getTasks(section.id).map((item, idx) => (
                        <Draggable draggableId={item.id + ""} index={idx} key={item.id}>
                          {(provided) => (
                            <Card
                              sx={{ cursor: "pointer" }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <TaskItem task={item} toggleDescriptionModal={toggleDescriptionModal} />
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {/*{state.todoTasks.length == 0 && <Typography sx={{ mx: 'auto', mt: '40px', color: 'grey.600' }}>No Tasks</Typography>}*/}
                      {provided.placeholder}
                    </SimpleBarStyled>
                  </Box>
                )}
              </Droppable>
            ))}
            <Box
              sx={{
                minWidth: "300px",
                height: "400px",
                borderRadius: 1,
                textAlign: "center",
                pt: 2,
                border: "1px solid",
                borderColor: "divider",
              }}>
              <Button color={"primary"} startIcon={<LuPlus />} onClick={onAddSection}>
                Add Section
              </Button>
            </Box>
          </Box>
        </DragDropContext>
      </Box>

      <Dialog open={newTaskModal} onClose={toggleNewTaskModal} maxWidth={"md"} fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Create New Task</Typography>
          <IconButton onClick={toggleNewTaskModal}>
            <LuX />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ overflowY: "auto" }} dividers>
          <form onSubmit={handleNewTask}>
            <SelectInput label="Project" name="category" containerSx={{ my: 1 }} control={control}>
              <MenuItem value="Attex">Attex</MenuItem>
              <MenuItem value="CRM">CRM</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
            </SelectInput>

            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xxl={8} xs={12}>
                <FormInput type="text" label="Title" name="title" placeholder="Enter Title" control={control} />
              </Grid>

              <Grid item xxl={4} xs={12}>
                <SelectInput name="priority" label="Priority" control={control}>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </SelectInput>
              </Grid>
            </Grid>

            <FormInput
              name="description"
              label="Description"
              containerSx={{ my: 1, "& > .MuiOutlinedInput-root": { padding: "0px !important" } }}
              rows={3}
              control={control}
              multiline
            />

            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xl={6} xs={12}>
                <SelectInput name="assignTo" label="Assign To" control={control}>
                  {assignees.map((assignee, idx) => (
                    <MenuItem key={idx} value={JSON.stringify(assignee)}>
                      {assignee.title}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>

              <Grid item xl={6} xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel htmlFor="task-dueDate" sx={{ mb: 1 }}>
                    Due Date
                  </FormLabel>

                  <CustomDatepicker
                    hideAddon
                    dateFormat="yyyy-MM-dd"
                    value={newTaskDetails?.dueDate}
                    inputClass="form-input"
                    onChange={(date) => {
                      handleDateChange(date);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%", my: 2 }} />
            <CardActions sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", p: 0 }}>
              <Button variant="outlined" color="secondary" onClick={toggleNewTaskModal}>
                Close
              </Button>

              <Button variant="contained" color="success" type="submit">
                Create
              </Button>
            </CardActions>
          </form>
        </DialogContent>
      </Dialog>

      <TaskDescription descriptionModal={descriptionModal} toggleDescriptionModal={toggleDescriptionModal} />
    </>
  );
};

export default Kanban;
