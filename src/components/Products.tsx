import {
  Grid,
  TextField,
  Box,
  Button,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { ProductDetail } from "../models/model";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import ProductService from "../services/product.service";

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDetail[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<any>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState<string>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const breakpoint = useMediaQuery("(min-width:600px)");

  const productService = new ProductService();

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      if (response.status === 200) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterAndSearch();
  }, [checkedItems, searchText]);

  const debounceSearch = (e: any) => {
    const value = e.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setSearchText(value);
    }, 500);

    setDebounceTimeout(timeout);
  };

  const isPrinceinRange = (price: number, range: string): boolean => {
    const [minValue, maxValue] = range.split("-");
    const minRange = Number(minValue.replace("Rs.", "").trim());
    const maxRange = maxValue
      ? Number(maxValue.replace("Rs.", "").trim())
      : null;

    return maxRange !== null
      ? price >= minRange && price <= maxRange
      : price >= minRange;
  };

  const filterAndSearch = () => {
    let filteredResponse = products;

    if (searchText) {
      filteredResponse = products.filter((product) => {
        const attributeToJoin = ["name", "type", "color"];
        const concatenatedValues = attributeToJoin
          .map((attribute) => product[attribute])
          .join("")
          .toLowerCase();
        return concatenatedValues.includes(searchText.toLowerCase());
      });
    }

    Object.entries(checkedItems).every(([key, values]) => {
      filteredResponse = filteredResponse.filter((product) =>
        Object.entries(checkedItems).every(([key, values]) => {
          if (key === "price") {
            return (
              values.length === 0 ||
              values.some((range: string) =>
                isPrinceinRange(product[key], range)
              )
            );
          } else {
            return values.length === 0 || values.includes(product[key]);
          }
        })
      );
    });

    setFilteredProducts(filteredResponse);
  };

  const handleCheckedItemChange = (newCheckedItems: Record<string, any>) => {
    setCheckedItems(newCheckedItems);
  };

  return (
    <Grid container spacing={2} mt={5}>
      {breakpoint ? (
        <Grid item xs={3}>
          <Sidebar
            products={products}
            checkedItems={checkedItems}
            onCheckedItemsChange={handleCheckedItemChange}
          />
        </Grid>
      ) : null}

      <Grid item xs={breakpoint ? 9 : 12} m={breakpoint ? 0 : 3}>
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
            defaultValue={searchText}
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: 3,
              mt: -1,
              "&:hover": {
                backgroundColor: "#222222",
                boxShadow: "none",
              },
            }}
            startIcon={<SearchIcon sx={{ ml: 1 }} />}
            onClick={filterAndSearch}
          />
          {!breakpoint ? (
            <Button
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: 3,
                mt: -1,
                "&:hover": {
                  backgroundColor: "#222222",
                  boxShadow: "none",
                },
              }}
              startIcon={<FilterAltOutlinedIcon sx={{ ml: 1 }} />}
              onClick={openDrawer}
            />
          ) : null}
        </Box>
        <Grid container rowSpacing={3} columnSpacing={2}>
          {filteredProducts.map((item: ProductDetail) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ProductList {...item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <Sidebar
          products={products}
          checkedItems={checkedItems}
          onCheckedItemsChange={handleCheckedItemChange}
        />
      </Drawer>
    </Grid>
  );
};

export default Products;
