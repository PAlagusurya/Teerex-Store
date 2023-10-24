import { Typography, Box } from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

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
      <Typography variant="h5">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Teerex Store
        </Link>
      </Typography>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Products
          </Link>
        </Typography>
        <AddShoppingCartIcon fontSize="large" />
      </Box>
    </Box>
  );
};

export default Header;
