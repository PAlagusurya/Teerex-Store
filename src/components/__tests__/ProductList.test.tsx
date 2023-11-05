import { fireEvent, render, screen } from "@testing-library/react";
import ProductList from "../ProductList";
import { ProductDetail } from "../../models/model";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const products: ProductDetail = {
  id: 1,
  imageURL:
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
  name: "Black Polo",
  type: "Polo",
  price: 250,
  currency: "INR",
  color: "Black",
  gender: "Men",
  quantity: 3,
};

describe("ProductList Component", () => {
  test("renders product list with add to cart button", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductList {...products} />
        </Provider>
      </BrowserRouter>
    );
    const addToCartButton = screen.getByText("Add to cart");
    expect(addToCartButton).toBeInTheDocument();
  });

  test("increment quantity when item are added to cart", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductList {...products} />
        </Provider>
      </BrowserRouter>
    );

    const addButton = screen.getByTestId("add-button");

    fireEvent.click(addButton);
    const quantityDisplay = screen.getByText("1");
    expect(quantityDisplay).toBeInTheDocument();
  });
});
