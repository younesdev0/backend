import { connectDB } from "./db";
import { Product } from "./models/product";
import { Sale } from "./models/sale";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const loadCSVData = async (filePath: string) => {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

const loadData = async () => {
  try {
    await connectDB();

    // Effacer les anciennes données
    await Product.deleteMany({});
    await Sale.deleteMany({});
    console.log("Old data cleared.");

    // Charger les produits depuis CSV
    const productsFilePath = path.join(__dirname, "../backend/data/products.csv");
    const productsData = await loadCSVData(productsFilePath);
    await Product.insertMany(productsData);
    console.log("Products loaded successfully!");

    // Charger les ventes depuis CSV
    const salesFilePath = path.join(__dirname, "../backend/data/sales.csv");
    const salesData = await loadCSVData(salesFilePath);
    await Sale.insertMany(salesData);
    console.log("Sales loaded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error loading data:", error);
    process.exit(1);
  }
};

loadData();