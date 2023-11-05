import axios, { AxiosPromise } from "axios";

class ProductService {
  private URL: string =
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

  getAllProducts(): AxiosPromise {
    const response = axios.get(this.URL);
    return response;
  }
}

export default ProductService;
