import { ProductDetail } from "../models/model";

const getProductsByCategory = (products: ProductDetail[]) => {
  const categories = ["color", "gender", "price", "type"];
  const result: Record<string, any> = {};

  products.forEach((product) => {
    categories.forEach((key) => {
      if (key === "price") {
        result[key]
          ? result[key].push(product[key])
          : (result[key] = [Number(product[key])]);
      } else {
        result[key]
          ? result[key].push(product[key])
          : (result[key] = [product[key]]);
      }
    });
  });

  for (let [key] of Object.entries(result)) {
    const uniqueValues = Array.from(new Set(result[key]));
    result[key] = uniqueValues;
  }

  if (result["price"]) {
    result["price"].sort((a: number, b: number) => a - b);
  }

  return result;
};

export default getProductsByCategory;
