import { Router, Request, Response } from "express";
import { Sale } from "../models/sale";
import { Product } from "../models/product";


const router = Router();

router.get("/total_sales", async (req: Request, res: Response) => {

    // const { startDate, endDate } = req.query;
  
    try {
      const sales = await Sale.find();

      console.log("sales :",sales);
      
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Error fetching sales data", error });
    }
  }); 
  

router.get("/trending_products", async (req: Request, res: Response) => {
    try {
      // Aggregating data in one query
      const result = await Sale.aggregate([
        { $group: { _id: "$ProductID", totalQuantity: { $sum: "$Quantity" }, totalAmount: { $sum: "$TotalAmount" } } },
        { $sort: { totalQuantity: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "products", // Product collection
            localField: "_id", // Match ProductID with _id in Product collection
            foreignField: "ProductID",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        {
          $project: {
            productId: "$_id",
            name: "$productInfo.ProductName",
            quantity: "$totalQuantity",
            totalAmount: "$totalAmount",
          },
        },
      ]);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trending products", error });
    }
  });
  
router.get("/category_sales", async (req: Request, res: Response) => {
    try {
      const salesData = await Sale.aggregate([
        {
          $lookup: {
            from: "products", // Product collection
            localField: "ProductID", // Match ProductID with ProductID in Product collection
            foreignField: "ProductID",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        { $group: { _id: "$productInfo.Category", totalSales: { $sum: "$TotalAmount" } } },
      ]);
  
      const totalSales = await Sale.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$TotalAmount" } } },
      ]);
  
      const categorySales = salesData.map((category) => ({
        category: category._id,
        sales: category.totalSales,
        percentage: (category.totalSales / totalSales[0].totalSales) * 100,
      }));
  
      res.json(categorySales);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category sales", error });
    }
  });
  

export default router;
