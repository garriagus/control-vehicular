import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const vehiculo = await prisma.vehiculo.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!vehiculo)
      return NextResponse.json({ message: "Vehiculo not found" }, { status: 404 });

    return NextResponse.json(vehiculo);
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedVehiculo = await prisma.vehiculo.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedVehiculo)
      return NextResponse.json({ message: "Vehiculo not found" }, { status: 404 });

    return NextResponse.json(deletedVehiculo);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Vehiculo not found",
          },
          {
            status: 404,
          }
        );
      }

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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { patente, tipo, marca, modelo, color, empleadoId } = await request.json();

    const updatedVehiculo = await prisma.vehiculo.update({
      where: {
        id: params.id,
      },
      data: {
        patente,
        tipo,
        marca,
        modelo,
        color,
        empleadoId,
      },
    });

    return NextResponse.json(updatedVehiculo);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Vehiculo not found",
          },
          {
            status: 404,
          }
        );
      }

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
