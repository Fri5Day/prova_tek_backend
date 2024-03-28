import { prisma } from "../database/prisma.js";


export const findAllLivro = async (req, res) => {
    try {
        const livro = await prisma.livro.findMany({include: {categoria: true} });
        return res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }

};

export const findByIdLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) }
        });
        res.json(livro);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error });
    }
};

export const createLivro = async (req, res) => {
    const { titulo, autor, descricao, categoriaId,
        anoPublicacao, copias, copiasDisponiveis } = req.body;

    //Converte para número inteiro
    const copiasInt = parseInt(copias);
    const copiasDisponiveisInt = parseInt(copiasDisponiveis);
    const anoPublicacaoInt = parseInt(anoPublicacao);
    const categoriaInt = parseInt(categoriaId, 10);

    const livro = await prisma.livro.create({
        data: {
            titulo, autor, descricao, categoriaId: categoriaInt,
            anoPublicacao: anoPublicacaoInt, copias: copiasInt,
            copiasDisponiveis: copiasDisponiveisInt
        },
    });

    return res.json(livro);
};

export const updateLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, descricao, categoriaId, anoPublicacao, copias, copiasDisponiveis } = req.body;

        const livro = await prisma.livro.update({
            where: { id: Number(id) },
            data: { titulo, autor, descricao, categoriaId, anoPublicacao, copias, copiasDisponiveis }
        });
        res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

export const alugarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        if (quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade não pode ser igual ou menor que zero." })
        }

        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        })

        if (livro.copiasDisponiveis >= quantidade) {
            const updateLivro = await prisma.livro.update({
                where: { id: Number(id) },
                data: { copiasDisponiveis: livro.copiasDisponiveis - quantidade }
            });

            return res.status(200).json({message: "Quantidade atualizada com sucesso."})
        }
        return res.status(400).json({message: "A quantidade não pode ser maior que o número de cópias disponiveis."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const devolverLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        if (quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade não pode ser igual ou menor que zero." })
        }

        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        })

        if (livro.copias >= livro.copiasDisponiveis + Number(quantidade)) {
            const updateLivro = await prisma.livro.update({
                where: { id: Number(id) },
                data: { copiasDisponiveis: livro.copiasDisponiveis + Number(quantidade) }
            });

            return res.status(200).json({message: "Quantidade atualizada com sucesso."})
        }
        return res.status(400).json({message: "As cópias disponiveis não podem ser maior que o número de cópias."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export const deleteLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await prisma.livro.delete({
            where: { id: Number(id) }
        });
        res.json({ mensagem: `livro ${id} removido com sucesso!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};