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
  checkedItems: Record<string, any>;
  onCheckedItemsChange: (newCheckedItems: Record<string, any>) => void;
}

const Sidebar: React.FC<props> = ({
  products,
  checkedItems,
  onCheckedItemsChange,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Record<string, any>>(
    {}
  );

  useEffect(() => {
    if (products.length) {
      const response = getProductsByCategory(products);
      setFilteredProducts(response);
    }
  }, [products]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
    item: any
  ) => {
    const updatedItem = { ...checkedItems };

    if (updatedItem[key]) {
      if (updatedItem[key].includes(item)) {
        // Item is already checked, so remove it
        updatedItem[key] = updatedItem[key].filter(
          (checkedItem: string | number) => checkedItem !== item
        );
      } else {
        // Item is not checked, so add it
        updatedItem[key] = [...updatedItem[key], item];
      }
    } else {
      updatedItem[key] = [item];
    }

    onCheckedItemsChange(updatedItem);
  };

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
                  control={
                    <Checkbox
                      checked={checkedItems[key]?.includes(item)}
                      onChange={(event) =>
                        handleCheckboxChange(event, key, item)
                      }
                    />
                  }
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
