/*
 * Copyright (c) 2023.
 * File Name: BreadCrumb.tsx
 * Author: Coderthemes
 */

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import PageMetaData from "./PageMetaData";
import { LuChevronLast, LuChevronLeft, LuChevronRight } from "react-icons/lu";

type BreadcrumbProps = {
  title: string;
  subName?: string;
};

const PageBreadcrumb = ({ title, subName }: BreadcrumbProps) => {
  const breadcrumbItems = [
    <Link key="1" color="inherit" variant="subtitle2" underline="none" href="" sx={{ fontWeight: 600 }}>
      Attex
    </Link>,
    <Link key="2" color="inherit" variant="body2" underline="none" href="">
      {subName}
    </Link>,
    <Typography key="3" variant="body2">
      {title}
    </Typography>,
  ];

  return (
    <>
      <PageMetaData title={title} />

      <Box height={75} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h5" color={"text.primary"}>
          {title}
        </Typography>
        <Breadcrumbs
          separator={<LuChevronRight size={12} />}
          aria-label="breadcrumb"
          sx={{
            "& ol": {
              display: "flex",
              gap: 1,
            },
          }}>
          {breadcrumbItems}
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default PageBreadcrumb;
