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
    result["price"].splice(0, 4);
    result["price"].push("0-Rs.250", "Rs.251-400", "Rs.450");
  }

  return result;
};

export default getProductsByCategory;
