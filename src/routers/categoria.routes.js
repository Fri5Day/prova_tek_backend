import express from 'express';
const router = express();
import { findAllCategoria, findByIdCategoria, createCategoria, updateCategoria, deleteCategoria } from "../controller/CategoriaController.js"

router.get("/categoria", findAllCategoria);
router.get("/categoria/:id", findByIdCategoria); 
router.post("/categoria", createCategoria);
router.put("/categoria/:id", updateCategoria);
router.delete("/categoria/:id", deleteCategoria);

export default router;