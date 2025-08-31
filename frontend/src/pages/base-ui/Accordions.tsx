/*
 * Copyright (c) 2023.
 * File Name: Accordions.tsx
 * Author: Coderthemes
 */

import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Grid,
  Typography,
} from "@mui/material";
import { LuArrowDown, LuArrowDownCircle, LuChevronDown, LuChevronRight, LuNavigation2 } from "react-icons/lu";
import { SyntheticEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

const CustomAccordion = styled((props: AccordionProps) => <Accordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }),
);

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary expandIcon={<LuChevronRight style={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const DefaultAccordions = () => {
  return (
    <ComponentContainerCard title="Default" description="Default Accordions with Basic styling">
      <Accordion>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography>Accordion 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </ComponentContainerCard>
  );
};

const DisabledAccordions = () => {
  return (
    <ComponentContainerCard title="Disabled" description="Disabled Accordions example">
      <Accordion>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel1a-content" id="paneld1a-header">
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel2a-content" id="paneld2a-header">
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary expandIcon={<LuChevronDown />} aria-controls="panel3a-content" id="paneld3a-header">
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </ComponentContainerCard>
  );
};

const CustomizedAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <ComponentContainerCard title="Customized" description="Custom styled Accordion with Default open state">
        <CustomAccordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <CustomAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Collapsible Group Item #1</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </CustomAccordionDetails>
        </CustomAccordion>
        <CustomAccordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <CustomAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </CustomAccordionDetails>
        </CustomAccordion>
        <CustomAccordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <CustomAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Collapsible Group Item #3</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </CustomAccordionDetails>
        </CustomAccordion>
      </ComponentContainerCard>
    </>
  );
};

const CustomIconAccordion = () => {
  return (
    <ComponentContainerCard title="Custom Icon" description="Accordion Items with Custom Icons">
      <Accordion
        sx={{
          ".Mui-expanded": {
            backgroundColor: "grey.200",
          },
        }}>
        <AccordionSummary expandIcon={<LuArrowDown />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          ".Mui-expanded": {
            backgroundColor: "grey.200",
          },
        }}>
        <AccordionSummary expandIcon={<LuArrowDownCircle />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          ".Mui-expanded": {
            backgroundColor: "grey.200",
          },
        }}>
        <AccordionSummary
          expandIcon={<LuNavigation2 style={{ rotate: "180deg" }} />}
          aria-controls="panel3a-content"
          id="panel3a-header">
          <Typography>Accordion 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </ComponentContainerCard>
  );
};

const Accordions = () => {
  return (
    <>
      <PageBreadcrumb title="Accordions" subName="Base UI" />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <DefaultAccordions />
        </Grid>

        <Grid item lg={6}>
          <DisabledAccordions />
        </Grid>

        <Grid item lg={6}>
          <CustomizedAccordion />
        </Grid>

        <Grid item lg={6}>
          <CustomIconAccordion />
        </Grid>
      </Grid>
    </>
  );
};

export default Accordions;
