import { render, RenderResult, screen } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CartItemsList, { CartItemsListProps } from "../CartItemsList";

const mockProps: CartItemsListProps = {
  id: 1,
  imageURL:
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
  name: "Black Polo",
  price: 250,
  quantity: 3,
  quantityCount: 1,
};

describe("renders CartList", () => {
  let component: RenderResult;

  test("renders the component with the provided props", () => {
    component = render(
      <BrowserRouter>
        <Provider store={store}>
          <CartItemsList {...mockProps} />
        </Provider>
      </BrowserRouter>
    );

    const { getByText, getAllByRole } = component;
    expect(getByText("Black Polo")).toBeInTheDocument();
    expect(getByText("Rs.250")).toBeInTheDocument();
    const deleteButton = screen.getAllByRole("delete") as HTMLButtonElement[];
    deleteButton.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
});
