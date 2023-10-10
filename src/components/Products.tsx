import { Grid, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
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
    <Grid container spacing={2} mt={5}>
      <Grid item xs={3}>
        SIDEBAR
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ display: "flex", mb: 5, gap: 3 }}>
          <TextField
            variant="standard"
            sx={{ width: "60vw" }}
            placeholder="Search for Products"
          />
          <SearchIcon
            sx={{
              px: 2,
              py: 1.3,
              color: "white",
              backgroundColor: "grey",
              borderRadius: 3,
              mt: -1,
            }}
          />
        </Box>
        <Grid container rowSpacing={3} columnSpacing={2}>
          {cartItems.map((item: ProductDetail) => (
            <Grid item xs={12} md={4}>
              <ProductList key={item.id} {...item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
