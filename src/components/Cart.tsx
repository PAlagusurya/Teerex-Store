import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductDetail } from "../models/model";
import CartItemsList from "./CartItemsList";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState<number>();

  const totalPrice = () => {
    if (!cartItems.length) return 0;

    const total = cartItems.map((item) => item.price * item?.quantityCount);
    const result = total.reduce((total, n) => total + n);
    return result;
  };

  useEffect(() => {
    const amount = totalPrice();
    setTotalAmount(amount);
  }, [cartItems]);

  return (
    <Box sx={{ m: 3 }} data-testid="cart-item">
      <Typography variant="h5" mb={5}>
        Shopping Cart
      </Typography>
      <Box ml={10} mb={3}>
        <Stack spacing={2}>
          {cartItems.map((cartItem: ProductDetail) => (
            <CartItemsList {...cartItem} key={cartItem.id} />
          ))}
        </Stack>
        <Divider sx={{ mt: 3 }} />
        <Typography sx={{ fontWeight: 600, mt: 3 }}>
          Total Amount: Rs.{totalAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
