// src/data.ts
import { Sale, Product } from "./types";

export const sales: Sale[] = [
  { saleId: 1, productId: 1, quantity: 10, totalAmount: 500, date: "2023-01-01" },
  { saleId: 2, productId: 2, quantity: 5, totalAmount: 50, date: "2023-01-02" },
  { saleId: 3, productId: 1, quantity: 3, totalAmount: 150, date: "2023-01-03" },
  { saleId: 4, productId: 3, quantity: 8, totalAmount: 160, date: "2023-01-04" },
  { saleId: 5, productId: 4, quantity: 2, totalAmount: 20, date: "2023-01-05" },
];

export const products: Product[] = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 699 },
  { id: 2, name: "Novel", category: "Books", price: 15 },
  { id: 3, name: "T-Shirt", category: "Clothing", price: 25 },
  { id: 4, name: "Notebook", category: "Books", price: 5 },
];
