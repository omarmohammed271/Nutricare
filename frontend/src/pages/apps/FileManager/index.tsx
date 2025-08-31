import { Box, Button, Card, CardContent, Drawer, IconButton, InputAdornment, TextField } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import LeftPanel from "./LeftPanel";
import { LuLayoutGrid, LuList, LuMenu, LuSearch } from "react-icons/lu";
import { quickAccessFiles } from "./data";
import QuickAccess from "./QuickAccess";
import Recent from "./Recent";
import { useToggle, useViewPort } from "@src/hooks";

const FileManager = () => {
  const { width } = useViewPort();
  const { isOpen, hide, toggleOpen } = useToggle();
  return (
    <>
      <PageBreadcrumb title="File Manager" subName="Apps" />
      <Box sx={{ display: { lg: "flex" }, gap: "16px" }}>
        {width >= 1024 ? (
          <Box
            sx={{
              display: { lg: "flex", xs: "hidden" },
              left: 0,
              top: 0,
              bottom: 0,
              minWidth: "288px",
              zIndex: { lg: 0, xs: 50 },
              position: { lg: "static", xs: "fixed" },
            }}>
            <LeftPanel />
          </Box>
        ) : (
          <Drawer open={isOpen} onClose={hide}>
            <LeftPanel />
          </Drawer>
        )}
        <Card sx={{ p: "8px", width: "100%" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Box sx={{ display: { lg: "none", xs: "block" } }}>
                  <IconButton
                    onClick={toggleOpen}
                    sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "grey.700" }}>
                    <LuMenu size={18} />
                  </IconButton>
                </Box>
                <form>
                  <Box sx={{ position: "relative", display: "flex", borderRadius: "6px" }}>
                    <TextField
                      id="input-with-icon-textfield"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LuSearch size={20} />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      placeholder="People, groups & messages..."
                    />
                  </Box>
                </form>
              </Box>
              <Box>
                <IconButton>
                  <LuList />
                </IconButton>
                <IconButton>
                  <LuLayoutGrid />
                </IconButton>
              </Box>
            </Box>

            <QuickAccess quickAccessFiles={quickAccessFiles} />

            <Recent />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default FileManager;
