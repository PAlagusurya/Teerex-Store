import { Typography, Button, Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

interface props {
  name: string;
  imageURL: string;
  price: number;
}

const ProductList: React.FC<props> = (props) => {
  const { imageURL, name, price } = props;

  return (
    <Grid item xs={9} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader subheader={name} />
        <CardMedia component="img" height="194" image={imageURL} alt={name} />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ fontWeight: "600", mt: 1 }}>
            Rs.{price}
          </Typography>
          <Button variant="contained">Add to cart</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductList;
