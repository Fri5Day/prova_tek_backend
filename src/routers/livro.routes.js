import express from 'express';
const router = express();
import { findAllLivro, findByIdLivro, createLivro, updateLivro, deleteLivro, alugarLivro, devolverLivro } from "../controller/LivroController.js"

router.get("/livro", findAllLivro);
router.get("/livro/:id", findByIdLivro); 
router.post("/livro", createLivro);
router.put("/livro/:id", updateLivro);
router.put("/livro/:id/alugar", alugarLivro);
router.put("/livro/:id/devolver", devolverLivro);
router.delete("/livro/:id", deleteLivro);

export default router;