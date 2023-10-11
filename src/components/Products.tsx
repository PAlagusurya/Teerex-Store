import { Grid, TextField, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ProductDetail } from "../models/model";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import ProductService from "../services/product.service";

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(0);

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

  const debounceSearch = (e: any) => {
    const value = e.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);

    setDebounceTimeout(timeout);
  };

  const performSearch = (searchText: string) => {
    const filteredProducts = products.map((product) => {
      console.log("PRODUCT:", product);
    });
  };

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={3}>
        <Sidebar products={products} />
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ display: "flex", mb: 5, gap: 3, ml: 5 }}>
          <TextField
            variant="standard"
            sx={{
              width: "50vw",
            }}
            placeholder="Search for Products"
            onChange={(e) => debounceSearch(e)}
          />
          <Button
            sx={{
              px: 2,
              py: 1.5,
              color: "white",
              backgroundColor: "grey",
              borderRadius: 3,
              mt: -1,
            }}
            startIcon={<SearchIcon sx={{ ml: 1 }} />}
            onClick={(e) => debounceSearch(e)}
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
