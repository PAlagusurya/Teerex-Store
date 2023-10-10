import React, { useEffect, useState } from "react";
import { ProductDetail } from "../models/model";
import getProductsByCategory from "../utils/products.util";
import {
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

interface props {
  products: ProductDetail[];
}

const Sidebar: React.FC<props> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Record<string, any>>(
    {}
  );

  useEffect(() => {
    if (products.length) {
      const response = getProductsByCategory(products);
      setFilteredProducts(response);
    }
  }, [products]);

  return (
    <Paper sx={{ m: 2, p: 3, width: "15vw" }}>
      {Object.entries(filteredProducts).map(([key, value]) => (
        <Box>
          <Typography variant="h6" my={2} fontWeight={600}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Typography>
          {value.map((item: number | string) => {
            return <Typography>{item}</Typography>;
          })}
        </Box>
      ))}
    </Paper>
  );
};

export default Sidebar;
