import { Typography, Button, IconButton, Box, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "../redux/cartSlice";

interface props {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
  type: string;
  currency: string;
  color: string;
  gender: string;
  [key: string]: string | number;
}

const ProductList: React.FC<props> = (props) => {
  const { id, imageURL, name, price, quantity } = props;
  const [enableHandleItems, setEnableHandleItems] = useState<boolean>(false);
  const [quantityCount, setQuantityCount] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddItem = () => {
    setEnableHandleItems(true);
    setQuantityCount(1);
    dispatch(addItem(props));
    dispatch(
      updateItem({
        id,
        quantityCount,
        property: "quantityCount",
      })
    );
  };

  const handleIncrement = () => {
    if (quantityCount < quantity) {
      setQuantityCount(quantityCount + 1);
    } else {
      handleClick();
    }
  };

  const handleDecrement = () => {
    if (quantityCount > 1) {
      setQuantityCount(quantityCount - 1);
    } else {
      dispatch(removeItem(id));
      setEnableHandleItems(false);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    dispatch(
      updateItem({
        id,
        quantityCount,
        property: "quantityCount",
      })
    );
  }, [quantityCount]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "150%" }}>
          Item Out Of Stock!
        </Alert>
      </Snackbar>
      <CardHeader subheader={name} />
      <CardMedia component="img" height="194" image={imageURL} alt={name} />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ fontWeight: "600", mt: 1 }}>
          Rs.{price}
        </Typography>
        {enableHandleItems ? (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ backgroundColor: "black" }}
          >
            <IconButton onClick={handleDecrement} sx={{ color: "white" }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Box padding="0.5rem" sx={{ color: "white" }}>
              {quantityCount}
            </Box>
            <IconButton onClick={handleIncrement} sx={{ color: "white" }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Button
            variant="contained"
            data-testid="add-button"
            onClick={handleAddItem}
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              color: "white",
              "&:hover": {
                backgroundColor: "#222222",
              },
            }}
          >
            Add to cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
