import { ISize, IType } from "./Products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  sizes?: ISize;
  slug: string;
  title: string;
  gender: 'men'|'women'|'kid'|'unisex';
  quantity: number;
} 