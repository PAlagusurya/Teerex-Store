import { ProductDetail } from "../models/model";

const getProductsByCategory = (products: ProductDetail[]) => {
  const categories = ["color", "gender", "price", "type"];
  const result: Record<string, any> = {};

  products.forEach((product) => {
    for (let [key, value] of Object.entries(product)) {
      const isPresent = categories.includes(key);

      if (key === "price") {
        value = Number(value);
      }

      if (isPresent) {
        result[key] ? result[key].push(value) : (result[key] = [value]);
        const uniqueValues = Array.from(new Set(result[key]));
        result[key] = uniqueValues;
      }
    }

    if (result["price"]) {
      result["price"].sort((a: number, b: number) => a - b);
    }
  });

  return result;
};

export default getProductsByCategory;
