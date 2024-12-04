import { Router } from "express";
import { Sale } from "../models/sale";
import { Product } from "../models/product";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    // Aggregation pipeline to calculate total sales for each product
    const productSales = await Product.aggregate([
      {
        $lookup: {
          from: "sales", // Join with the 'sales' collection
          localField: "ProductID", // Match ProductID in the products collection
          foreignField: "ProductID", // with ProductID in the sales collection
          as: "salesData", // Alias for the matched sales data
        },
      },
      {
        $project: {
          ProductID: 1,
          ProductName: 1,
          Price: 1,
          // Calculate the total sales by summing the Quantity * Price for each sale
          VentsParProduit: {
            $sum: {
              $map: {
                input: "$salesData", // Iterate over the matched sales
                as: "sale",
                in: { $multiply: ["$$sale.Quantity", "$Price"] }, // Quantity * Price for each sale
              },
            },
          },
        },
      },
    ]);

    res.json(productSales);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

export default router;
