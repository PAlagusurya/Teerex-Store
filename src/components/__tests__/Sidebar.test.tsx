import { render } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ProductDetail } from "../../models/model";

const products: ProductDetail[] = [
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
  },
];

const mockOnCheckedItemsChange = jest.fn();

const mockCheckedItems = {
  Price: [250, 500, 300],
  Gender: ["Women", "Men"],
};

describe("renders Sidebar Component", () => {
  test("displays category name with first letter capitalised", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar
            products={products}
            checkedItems={mockCheckedItems}
            onCheckedItemsChange={mockOnCheckedItemsChange}
          />
        </Provider>
      </BrowserRouter>
    );
    const category: string = "price";

    const findCapitalisedCategory = getByText(
      category.charAt(0).toUpperCase() + category.slice(1)
    );

    expect(findCapitalisedCategory).toBeInTheDocument();
  });
});
