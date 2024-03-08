-- CreateTable
CREATE TABLE `Livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `autor` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `anoPublicacao` INTEGER NOT NULL,
    `copias` INTEGER NOT NULL,
    `copiasDisponiveis` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Livro` ADD CONSTRAINT `Livro_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
