import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductDetail } from "../models/model";
import ProductList from "./ProductList";
import axios from "axios";

const Products: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductDetail[]>([]);

  const getProducts = async () => {
    try {
      const url =
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
      const response = await axios.get(url);
      if (response.status === 200) {
        setCartItems(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={3}>
        SIDEBAR
      </Grid>

      {cartItems.map((item: ProductDetail) => (
        <ProductList key={item.id} {...item} />
      ))}
    </Grid>
  );
};

export default Products;
