import { Categorie } from "./categorie";

export interface Product {
  _id: number;
  pName: string;
  pPrice: number;
  pCategory: Categorie
  pDescription: string;
  pImages: string;
}
