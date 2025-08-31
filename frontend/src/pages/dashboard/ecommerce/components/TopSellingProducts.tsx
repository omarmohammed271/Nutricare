import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LuDownload } from "react-icons/lu";
import { products } from "./data";

const TopSellingProducts = () => {
  return (
    <Card>
      <Box
        display={"flex"}
        padding={2}
        borderBottom={"1px solid"}
        borderColor={"divider"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Typography component={"h4"} fontWeight={500} color={"grey.700"}>
          Top Selling Products
        </Typography>
        <Button variant="contained" sx={{ paddingY: "6px" }} size="small" color="primary" endIcon={<LuDownload />}>
          Export
        </Button>
      </Box>
      <Box overflow={"auto"}>
        <Table sx={{ width: "100%", paddingBottom: "0px" }}>
          <TableHead sx={{ backgroundColor: "grey.100", paddingX: "10px", borderBottom: "1px solid #444d57" }}>
            <TableRow>
              <TableCell sx={{ paddingY: "6px", paddingX: "16px" }}>Product</TableCell>
              <TableCell sx={{ padding: "6px", paddingX: "16px" }}>Price</TableCell>
              <TableCell sx={{ padding: "6px", paddingX: "16px" }}>Orders</TableCell>
              <TableCell sx={{ padding: "6px", paddingX: "16px" }}>Avl. Quantity</TableCell>
              <TableCell sx={{ padding: "6px", paddingX: "16px" }}>Seller</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(products || []).map((product, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ padding: 2 }}>{product.product}</TableCell>
                  <TableCell sx={{ padding: 2 }}>${product.price}</TableCell>
                  <TableCell sx={{ padding: 2 }}>{product.orders}</TableCell>
                  <TableCell sx={{ padding: 2 }}>{product.quantity}</TableCell>
                  <TableCell sx={{ padding: 2 }}>{product.seller}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box textAlign={"center"} my={"12px"}>
          <Typography color={"primary"} sx={{ textDecorationLine: "underline" }} fontWeight={700}>
            View All
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default TopSellingProducts;
