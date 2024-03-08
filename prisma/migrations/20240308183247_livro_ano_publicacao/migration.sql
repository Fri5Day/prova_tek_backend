/*
  Warnings:

  - You are about to alter the column `anoPublicacao` on the `livro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `livro` MODIFY `anoPublicacao` INTEGER NOT NULL;
