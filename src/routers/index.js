import categoriaRoutes from "./categoria.routes.js";
import LivroRoutes from "./livro.routes.js";

import express from 'express';
const router = express.Router();

router.use(categoriaRoutes, LivroRoutes);

export default router;