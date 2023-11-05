import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Header Component", () => {
  test("renders Teerex Store", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    const logoText = screen.getByText("Teerex Store");
    expect(logoText).toBeInTheDocument();
  });

  test("renders shopping cart icon", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    const shoppingCartIcon = screen.getByTestId("shopping-cart-icon");
    expect(shoppingCartIcon).toBeInTheDocument();
  });
});
