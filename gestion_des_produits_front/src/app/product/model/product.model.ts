import { Category } from "../../category/model/category.model";

export interface Product {
  id: number;         
  name: string;       
  price: number;      
  categoryId: number; 
  categoryName?: string;
}
