/*
  Warnings:

  - The primary key for the `Empleado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cedula` on the `Empleado` table. All the data in the column will be lost.
  - The primary key for the `Vehiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `empleado` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `placa` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the `Movimiento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[legajo]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patente]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Empleado` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `empleadoId` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patente` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movimiento" DROP CONSTRAINT "Movimiento_empleadoId_fkey";

-- DropForeignKey
ALTER TABLE "Vehiculo" DROP CONSTRAINT "Vehiculo_empleado_fkey";

-- DropIndex
DROP INDEX "Vehiculo_placa_key";

-- AlterTable
ALTER TABLE "Empleado" DROP CONSTRAINT "Empleado_pkey",
DROP COLUMN "cedula",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vehiculo" DROP CONSTRAINT "Vehiculo_pkey",
DROP COLUMN "empleado",
DROP COLUMN "placa",
ADD COLUMN     "empleadoId" TEXT NOT NULL,
ADD COLUMN     "patente" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "modelo" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vehiculo_id_seq";

-- DropTable
DROP TABLE "Movimiento";

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_legajo_key" ON "Empleado"("legajo");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_email_key" ON "Empleado"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_patente_key" ON "Vehiculo"("patente");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
