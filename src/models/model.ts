export interface ProductDetail {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
  quantityCount?: any;
  [key: string]: string | number | undefined;
}
