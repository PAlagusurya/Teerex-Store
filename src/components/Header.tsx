import { Typography, Box } from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
        <Box sx={{ display: "flex" }}>
          <Link to="/carts">
            <AddShoppingCartIcon
              data-testid="shopping-cart-icon"
              fontSize="large"
            />
          </Link>
          <Typography
            sx={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              textAlign: "center",
              height: "25px",
              width: "25px",
              position: "absolute",
              top: "20px",
              right: "3px",
              zIndex: 1,
            }}
          >
            {cartItems.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
