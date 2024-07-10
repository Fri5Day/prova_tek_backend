import { prisma } from "../database/prisma.js";

export const findAllLivro = async (req, res) => {
    try {
        const livro = await prisma.livro.findMany({ include: { categoria: true } });
        return res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livros." });
    }
};

export const findByIdLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) }
        });
        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado." });
        }
        res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livro." });
    }
};

export const createLivro = async (req, res) => {
    try {
        const { titulo, autor, descricao, categoriaId, anoPublicacao, copias, copiasDisponiveis } = req.body;

        // Validação dos campos obrigatórios
        if (!titulo || !autor || !descricao || !categoriaId || !anoPublicacao || !copias || !copiasDisponiveis) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Converte para número inteiro
        const copiasInt = parseInt(copias);
        const copiasDisponiveisInt = parseInt(copiasDisponiveis);
        const anoPublicacaoInt = parseInt(anoPublicacao);
        const categoriaInt = parseInt(categoriaId, 10);

        if (isNaN(copiasInt) || isNaN(copiasDisponiveisInt) || isNaN(anoPublicacaoInt) || isNaN(categoriaInt)) {
            return res.status(400).json({ message: "Valores inválidos fornecidos para numéricos." });
        }

        if (copiasInt <= 0) {
            return res.status(400).json({ message: "A quantidade de cópias não pode ser igual ou menor que zero." });
        }

        const livro = await prisma.livro.create({
            data: {
                titulo,
                autor,
                descricao,
                categoriaId: categoriaInt,
                anoPublicacao: anoPublicacaoInt,
                copias: copiasInt,
                copiasDisponiveis: copiasDisponiveisInt
            },
        });

        return res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar livro." });
    }
};

export const updateLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, descricao, categoriaId, anoPublicacao, copias, copiasDisponiveis } = req.body;

        if (!titulo || !autor || !descricao || !categoriaId || !anoPublicacao || !copias || !copiasDisponiveis) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const livro = await prisma.livro.update({
            where: { id: Number(id) },
            data: { titulo, autor, descricao, categoriaId, anoPublicacao, copias, copiasDisponiveis }
        });

        res.json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar livro." });
    }
};

export const alugarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade não pode ser igual ou menor que zero." });
        }

        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        });

        if (livro.copiasDisponiveis >= quantidade) {
            await prisma.livro.update({
                where: { id: Number(id) },
                data: { copiasDisponiveis: livro.copiasDisponiveis - quantidade }
            });

            return res.status(200).json({ message: "Quantidade atualizada com sucesso." });
        }

        return res.status(400).json({ message: "A quantidade não pode ser maior que o número de cópias disponíveis." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao alugar livro." });
    }
};

export const devolverLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade não pode ser igual ou menor que zero." });
        }

        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) },
        });

        if (livro.copias >= livro.copiasDisponiveis + Number(quantidade)) {
            await prisma.livro.update({
                where: { id: Number(id) },
                data: { copiasDisponiveis: livro.copiasDisponiveis + Number(quantidade) }
            });

            return res.status(200).json({ message: "Quantidade atualizada com sucesso." });
        }

        return res.status(400).json({ message: "As cópias disponíveis não podem ser maior que o número de cópias." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao devolver livro." });
    }
};

export const deleteLivro = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.livro.delete({
            where: { id: Number(id) }
        });
        res.json({ mensagem: `Livro ${id} removido com sucesso!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover livro." });
    }
};
