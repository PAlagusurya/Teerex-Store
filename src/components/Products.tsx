import { Grid, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ProductDetail } from "../models/model";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import ProductService from "../services/product.service";

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);

  const productService = new ProductService();

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      if (response.status === 200) {
        setProducts(response.data);
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
        <Sidebar products={products} />
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ display: "flex", mb: 5, gap: 3, ml: 5 }}>
          <TextField
            variant="standard"
            sx={{ width: "50vw" }}
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
          {products.map((item: ProductDetail) => (
            <Grid item xs={12} md={4} key={item.id}>
              <ProductList {...item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
