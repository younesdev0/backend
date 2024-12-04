"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../data");
const router = (0, express_1.Router)();
router.get("/products", (req, res) => {
    const productSales = data_1.products.map((product) => {
        const productStats = data_1.sales.filter((sale) => sale.productId === product.id);
        const totalQuantity = productStats.reduce((sum, sale) => sum + sale.quantity, 0);
        return { ...product, totalQuantity };
    });
    res.json(productSales);
});
exports.default = router;
