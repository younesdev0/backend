"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/analytics.ts
const express_1 = require("express");
const data_1 = require("../data");
const router = (0, express_1.Router)();
router.get("/total_sales", (req, res) => {
    const totalSales = data_1.sales.reduce((sum, sale) => sum + sale.amount, 0);
    res.json({ totalSales });
});
router.get("/trending_products", (req, res) => {
    const productStats = data_1.sales.reduce((acc, sale) => {
        acc[sale.productId] = acc[sale.productId] || { quantity: 0, amount: 0 };
        acc[sale.productId].quantity += sale.quantity;
        acc[sale.productId].amount += sale.amount;
        return acc;
    }, {});
    const trendingProducts = Object.entries(productStats)
        .map(([productId, stats]) => ({
        productId: Number(productId),
        name: data_1.products.find((p) => p.id === Number(productId))?.name || "Unknown",
        ...stats,
    }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 3);
    res.json(trendingProducts);
});
router.get("/category_sales", (req, res) => {
    const categoryStats = data_1.sales.reduce((acc, sale) => {
        acc[sale.category] = acc[sale.category] || { sales: 0, percentage: 0 };
        acc[sale.category].sales += sale.amount;
        return acc;
    }, {});
    const totalSales = data_1.sales.reduce((sum, sale) => sum + sale.amount, 0);
    for (const category in categoryStats) {
        categoryStats[category].percentage =
            (categoryStats[category].sales / totalSales) * 100;
    }
    res.json(categoryStats);
});
exports.default = router;
