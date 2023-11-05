import { Button, Stack, Typography, Box, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../redux/cartSlice";

export interface CartItemsListProps {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
  quantityCount?: number;
  [key: string]: string | number | undefined;
}

const CartItemsList: React.FC<CartItemsListProps> = (props) => {
  const { id, imageURL, name, price, quantityCount, quantity } = props;
  const [choosenQuantity, setChoosenQuantity] = useState<any>(quantityCount);
  const dispatch = useDispatch();
  let quantityList = [];

  for (let i = 1; i <= quantity; i++) {
    quantityList.push(i);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setChoosenQuantity(event.target.value);
  };

  const handleDelete = () => {
    dispatch(removeItem(id));
  };

  useEffect(() => {
    dispatch(
      updateItem({
        id,
        quantityCount: choosenQuantity,
        property: "quantityCount",
      })
    );
  }, [choosenQuantity]);

  return (
    <Stack direction="row" spacing={2}>
      <img src={imageURL} alt={name} style={{ width: 100, height: 100 }} />
      <Stack>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Rs.{price}
        </Typography>
      </Stack>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">QTY:{choosenQuantity}</InputLabel>
          <Select
            sx={{ height: 50 }}
            labelId="select-label"
            value={choosenQuantity}
            label="QTY:"
            onChange={handleChange}
          >
            {quantityList.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button
          variant="outlined"
          role="delete"
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
            "&:hover, &:focus": {
              borderColor: "black",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              color: "black",
            },
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Stack>
  );
};

export default CartItemsList;
