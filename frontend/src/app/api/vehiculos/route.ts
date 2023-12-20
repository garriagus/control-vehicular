import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const vehiculos = await prisma.vehiculo.findMany();
        return NextResponse.json(vehiculos);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }
    }
}

export async function POST(request: Request) {
    try {
        const { patente, tipo, marca, modelo, color, empleadoId } = await request.json();

        const nuevoVehiculo = await prisma.vehiculo.create({
            data: {
                patente,
                tipo,
                marca,
                modelo,
                color,
                empleadoId,
            },
        });

        return NextResponse.json(nuevoVehiculo);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 500,
                }
            );
        }
    }
}
