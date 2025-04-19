/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Block` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Block_index_key" ON "Block"("index");
