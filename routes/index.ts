
import { Router } from "express";

import analyticsRoutes from "./analytics";

import productsRoutes from "./products";

const router = Router();

router.use("/analytics", analyticsRoutes);
router.use("/products", productsRoutes);

export default router;
