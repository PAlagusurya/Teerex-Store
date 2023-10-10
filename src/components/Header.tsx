import { Typography, Box } from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { grey } from "@mui/material/colors";

const Header: React.FC = () => {
  return (
    <Box
      py={4}
      px={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: grey[300],
      }}
    >
      <Typography variant="h5">Teerex Store</Typography>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <Typography variant="h6">Products</Typography>
        <AddShoppingCartIcon fontSize="large" />
      </Box>
    </Box>
  );
};

export default Header;
