import React, { useEffect, useState } from "react";
import { ProductDetail } from "../models/model";
import getProductsByCategory from "../utils/products.util";
import {
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  FormGroup,
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
        <Box key={key}>
          <Typography variant="h6" my={2} fontWeight={600}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Typography>
          <FormGroup>
            {value.map((item: number | string) => {
              return (
                <FormControlLabel
                  sx={{ mt: -1.5 }}
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              );
            })}
          </FormGroup>
        </Box>
      ))}
    </Paper>
  );
};

export default Sidebar;
