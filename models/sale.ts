import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  SaleID: { type: Number, required: true, unique: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true }, // ISO date format
  TotalAmount: { type: Number, required: true }
});

export const Sale = mongoose.model("Sale", saleSchema);
