import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Pagination,
  MenuItem,
  Menu,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Switch,
} from "@mui/material";
import { Edit, Delete, Visibility, CloudUpload, Search } from "@mui/icons-material";
import { ChevronDown } from "lucide-react";
import {
  Equation,
  equations,
  initialLibraryFiles,
  initialTemplates,
  LibraryFile,
  Recipe,
  recipes,
  Template,
} from "./index";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getEquations } from "@src/api/admin/adminAPI";

// =====================
// BasicMenu Component
// =====================
type BasicMenuProps = {
  recipeId: number;
  handleApproval: (id: number, val: boolean) => void;
};

const BasicMenu: React.FC<BasicMenuProps> = ({ recipeId, handleApproval }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (decision?: boolean) => {
    if (decision !== undefined) {
      handleApproval(recipeId, decision);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: "40px" }}>
        <ChevronDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <MenuItem onClick={() => handleClose(true)}>Approve</MenuItem>
        <MenuItem onClick={() => handleClose(false)}>Reject</MenuItem>
      </Menu>
    </div>
  );
};
// Main Component
// =====================
export default function ContentManagement() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const [recipeState, setRecipeState] = useState<Recipe[]>(recipes);
  const [libraryState, setLibraryState] = useState<LibraryFile[]>(initialLibraryFiles);
  const [templatesState, setTemplatesState] = useState<Template[]>(initialTemplates);

  // Library UI state
  const [searchLib, setSearchLib] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | string>("All");
  const [TagsFilter, setTagsFilter] = useState<"All" | string>("All");
  const [openUpload, setOpenUpload] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileCategory, setNewFileCategory] = useState("Meal Plan");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Templates UI state
  const [searchTemplate, setSearchTemplate] = useState("");
  const [CategoryTFilter, setCategoryTFilter] = useState("All");
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateCalories, setNewTemplateCalories] = useState("");
  const [newTemplateCategory, setNewTemplateCategory] = useState("Meal Plan");

  const handleApproval = (id: number, val: boolean) => {
    setRecipeState((prev) => prev.map((r) => (r.id === id ? { ...r, request: val ? "Approved" : "Rejected" } : r)));
  };

  const filteredLibrary = libraryState.filter((f) => {
    const matchesCategory = categoryFilter === "All" || f.category === categoryFilter;
    const q = searchLib.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      f.name.toLowerCase().includes(q) ||
      f.type.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const filteredTemplates = templatesState.filter((t) => {
    const q = searchTemplate.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.calories.toLowerCase().includes(q);
    const matchesCategory = CategoryTFilter === "All" || t.category === CategoryTFilter;
    return matchesSearch && matchesCategory;
  });

  const data = tab === 0 ? equations : tab === 1 ? recipeState : tab === 2 ? filteredLibrary : filteredTemplates;

  const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    if (tab === 2 || tab === 3) setPage(1);
  }, [searchLib, categoryFilter, searchTemplate, CategoryTFilter, tab]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleUpload = () => {
    if (!newFileName && !uploadedFile) {
      setOpenUpload(false);
      return;
    }
    const fileName = newFileName || uploadedFile?.name || "New File";
    const fileType = uploadedFile ? uploadedFile.name.split(".").pop()?.toUpperCase() || "FILE" : "FILE";

    setLibraryState((prev) => [
      {
        id: prev.length + 1,
        name: fileName,
        type: fileType,
        category: newFileCategory,
      },
      ...prev,
    ]);

    setNewFileName("");
    setUploadedFile(null);
    setNewFileCategory("Meal Plan");
    setOpenUpload(false);
    if (tab === 2) setPage(1);
  };

  // const handleAddTemplate = () => {
  //   if (!newTemplateName || !newTemplateCalories) {
  //     setOpenTemplateDialog(false);
  //     return;
  //   }

  //   setTemplatesState((prev) => [
  //     {
  //       id: prev.length + 1,
  //       name: newTemplateName,
  //       calories: newTemplateCalories,
  //       category: newTemplateCategory,
  //       active: true,
  //     },
  //     ...prev,
  //   ]);

  //   setNewTemplateName("");
  //   setNewTemplateCalories("");
  //   setNewTemplateCategory("Meal Plan");
  //   setOpenTemplateDialog(false);
  //   if (tab === 3) setPage(1);
  // };

  // GET equations
  const {data: equationsData, isPending, error} = useQuery({
    queryFn: getEquations,
    queryKey: ['equations'],
  })
  console.log(equationsData)
  console.log(error)


  // POST equations
  // const {
  //   mutate,
  //   isSuccess,
  //   isPending,
  //   isError
  // } = useMutation({
  //   mutationFn: 
  // });

  return (
    <>
      <h2 className="pt-0">Content Management</h2>

      <Box sx={{ width: "100%" }}>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setPage(1);
          }}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              minHeight: "40px",
              backgroundColor: "#f5f5f5",
            },
            "& .Mui-selected": {
              bgcolor: (theme) => theme.palette.primary.main,
              color: "white !important",
              borderRadius: "8px",
            },
          }}>
          <Tab label="Equation" />
          <Tab label="Recipe" />
          <Tab label="Library" />
          <Tab label="Templates" />
        </Tabs>

        {/* Controls */}
        <Box display="flex" justifyContent="flex-end" mt={2} mb={3} gap={2} alignItems="center">
          {tab === 2 && (
            <>
              <TextField
                size="small"
                placeholder="Search files"
                value={searchLib}
                onChange={(e) => setSearchLib(e.target.value)}
                sx={{ width: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="lib-category-label">Category</InputLabel>
                <Select
                  labelId="lib-category-label"
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Meal Plan">Meal Plan</MenuItem>
                  <MenuItem value="Workout Plan">Workout Plan</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="lib-tags-label">Tags</InputLabel>
                <Select
                  labelId="lib-tags-label"
                  value={TagsFilter}
                  label="Tags"
                  onChange={(e) => setTagsFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Tag 1">Tag 1</MenuItem>
                  <MenuItem value="Tag 2">Tag 2</MenuItem>
                  <MenuItem value="Tag 3">Tag 3</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {tab === 3 && (
            <>
              <TextField
                size="small"
                placeholder="Search by name"
                value={searchTemplate}
                onChange={(e) => setSearchTemplate(e.target.value)}
                sx={{ width: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="lib-categoryT-label">Category</InputLabel>
                <Select
                  labelId="lib-categoryT-label"
                  value={CategoryTFilter}
                  label="CategoryT"
                  onChange={(e) => setCategoryTFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Meal Plan">Meal Plan</MenuItem>
                  <MenuItem value="Workout Plan">Workout Plan</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          <Button
            variant="contained"
            onClick={() => (tab === 2 ? setOpenUpload(true) : null)}
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              "&:hover": { bgcolor: (theme) => theme.palette.secondary.main },
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}>
            {tab === 0
              ? "Create New Equation"
              : tab === 1
                ? "Recipe Requests"
                : tab === 2
                  ? "Upload New File"
                  : "Create New Templates"}
          </Button>
        </Box>

        {/* Table */}
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "10px 10px 0 0",
              border: "0.5px solid",
              borderColor: (theme) => theme.palette.primary.main,
              borderBottom: "none",
            }}>
            <Table
              size="small"
              sx={{
                borderCollapse: "collapse",
                "& td, & th": {
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.primary.main,
                  fontSize: "13px",
                },
                "& td:first-of-type, & th:first-of-type": {
                  borderLeft: "none",
                },
                "& td:last-of-type, & th:last-of-type": {
                  borderRight: "none",
                },
              }}>
              <TableHead>
                <TableRow sx={{ bgcolor: (theme) => theme.palette.primary.main, height: "50px" }}>
                  {tab === 0 &&
                    ["Name of Equation", "Equation", "Input", "Units", "Actions"].map((head) => (
                      <TableCell key={head} sx={{ color: "white", fontWeight: 600 }}>
                        {head}
                      </TableCell>
                    ))}
                  {tab === 1 &&
                    ["Recipe Name", "Calories", "Published By", "Complete Recipe", "Request", "Actions"].map((head) => (
                      <TableCell key={head} sx={{ color: "white", fontWeight: 600 }}>
                        {head}
                      </TableCell>
                    ))}
                  {tab === 2 &&
                    ["File Name", "File Type", "Category", "Actions"].map((head) => (
                      <TableCell key={head} sx={{ color: "white", fontWeight: 600 }}>
                        {head}
                      </TableCell>
                    ))}
                  {tab === 3 &&
                    ["Name", "Calories", "Category", "Visibility"].map((head) => (
                      <TableCell key={head} sx={{ color: "white", fontWeight: 600 }}>
                        {head}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* Equations */}
                {tab === 0 &&
                  (currentRows as Equation[]).map((eq) => (
                    <TableRow key={eq.id} hover>
                      <TableCell>{eq.name}</TableCell>
                      <TableCell>{eq.equation}</TableCell>
                      <TableCell>{eq.input}</TableCell>
                      <TableCell>{eq.units}</TableCell>
                      <TableCell>
                        <IconButton color="success">
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Recipes */}
                {tab === 1 &&
                  (currentRows as Recipe[]).map((recipe) => (
                    <TableRow key={recipe.id} hover>
                      <TableCell>{recipe.name}</TableCell>
                      <TableCell>{recipe.calories}</TableCell>
                      <TableCell>{recipe.publishedBy}</TableCell>
                      <TableCell>
                        <IconButton color="success">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {recipe.request === "Pending" ? (
                          <BasicMenu recipeId={recipe.id} handleApproval={handleApproval} />
                        ) : recipe.request === "Approved" ? (
                          <Chip
                            label="Approved"
                            size="small"
                            sx={{
                              borderRadius: "8px",
                              color: (theme) => theme.palette.primary.main,
                              fontWeight: "bold",
                            }}
                          />
                        ) : recipe.request === "Rejected" ? (
                          <Chip
                            label="Rejected"
                            size="small"
                            sx={{
                              borderRadius: "8px",
                              bgcolor: "red",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <IconButton color="success">
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Library */}
                {tab === 2 &&
                  (currentRows as LibraryFile[]).map((file) => (
                    <TableRow key={file.id} hover>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{file.type}</TableCell>
                      <TableCell>{file.category}</TableCell>
                      <TableCell>
                        <IconButton color="success">
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Templates */}
                {tab === 3 &&
                  (currentRows as Template[]).map((t) => (
                    <TableRow key={t.id} hover>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.calories}</TableCell>
                      <TableCell>{t.category}</TableCell>
                      <TableCell>
                        <Switch
                          checked={t.active}
                          onChange={() =>
                            setTemplatesState((prev) =>
                              prev.map((item) => (item.id === t.id ? { ...item, active: !item.active } : item)),
                            )
                          }
                          color="success"
                        />
                        {t.active ? "Active" : "Inactive"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              border: "1px solid",
              borderTop: "none",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderColor: (theme) => theme.palette.primary.main,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Button
              variant="text"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              sx={{
                minWidth: "40px",
                border: "1px solid rgb(227, 227, 227)",
                borderRadius: "10px",
                bgcolor: "white",
              }}>
              &lt;
            </Button>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              hidePrevButton
              hideNextButton
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "12px",
                },
                "& .Mui-selected": {
                  bgcolor: (theme) => theme.palette.primary.main + " !important",
                  color: "white",
                },
              }}
            />

            <Button
              variant="text"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              sx={{
                minWidth: "40px",
                border: "1px solid rgb(227, 227, 227)",
                borderRadius: "10px",
                bgcolor: "white",
              }}>
              &gt;
            </Button>
          </Box>
        </Box>

        {/* Upload Dialog (Library) */}
        <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="sm" fullWidth>
          <DialogTitle>File Upload</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                p: 4,
                textAlign: "center",
                mb: 3,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { borderColor: "#1976d2", backgroundColor: "#f9f9f9" },
              }}
              onClick={() => document.getElementById("fileInput")?.click()}>
              <CloudUpload fontSize="large" color="action" />
              <p>Click or drag file to this area to upload</p>
              <input
                id="fileInput"
                hidden
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUploadedFile(e.target.files[0]);
                    setNewFileName(e.target.files[0].name);
                  }
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="File name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select value={newFileCategory} label="Category" onChange={(e) => setNewFileCategory(e.target.value)}>
                <MenuItem value="Meal Plan">Meal Plan</MenuItem>
                <MenuItem value="Workout Plan">Workout Plan</MenuItem>
                <MenuItem value="General">General</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={() => setOpenUpload(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: (theme) => theme.palette.primary.main }}
                onClick={handleUpload}>
                Continue
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
