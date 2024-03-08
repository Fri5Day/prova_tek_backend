import { prisma } from "../database/prisma.js";


export const findAllCategoria = async (req, res) => {
    try {
        const categoria = await prisma.categoria.findMany();
        return res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }

};

export const findByIdCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await prisma.categoria.findUnique({
            where: { id: Number(id) }
        });
        res.json(categoria);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error });
    }
};

export const createCategoria = async (req, res) => {
    const { nome } = req.body;

    const categoria = await prisma.categoria.create({
        data: { nome },
    });

    return res.json(categoria);
};

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
      
        const categoria = await prisma.categoria.update({
            where: { id: Number(id) },
            data: { nome }
        });
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await prisma.categoria.delete({
            where: { id: Number(id) }
        });
        res.json({ mensagem: `Categoria ${id} removida com sucesso!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};