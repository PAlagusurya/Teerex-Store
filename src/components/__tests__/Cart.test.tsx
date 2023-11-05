import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Cart from "../Cart";

const mockStore = configureStore([]);
const initialState = {
  cart: {
    items: [
      {
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
        quantityCount: 1,
      },
      {
        id: 2,
        imageURL:
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/blue-polo-women.png",
        name: "Blue Polo",
        type: "Polo",
        price: 350,
        currency: "INR",
        color: "Blue",
        gender: "Women",
        quantity: 3,
        quantityCount: 1,
      },
    ],
  },
};

let store: ReturnType<typeof mockStore>;

beforeEach(() => {
  store = mockStore(initialState);
});

test("renders Cart component with cart items and total amount", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Cart />
      </Provider>
    </BrowserRouter>
  );

  expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  expect(screen.getAllByTestId("cart-item")).toHaveLength(1);
});
