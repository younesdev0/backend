export interface Sale {
    saleId: number;
    productId: number;
    quantity: number;
    totalAmount: number;
    date: string; // ISO string format for the date
  }
  
  export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
  }
  