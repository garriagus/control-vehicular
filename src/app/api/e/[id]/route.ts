import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const empleado = await prisma.empleado.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!empleado) {
      return NextResponse.json({ message: "Empleado not found" }, { status: 404 });
    }

    return NextResponse.json(empleado);
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
    const deletedEmpleado = await prisma.empleado.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedEmpleado) {
      return NextResponse.json({ message: "Empleado not found" }, { status: 404 });
    }

    return NextResponse.json(deletedEmpleado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Empleado not found",
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
    const { legajo, Nombre_completo, telefono, fecha_empleo, direccion, ciudad, email, Area, Horario, Turno } = await request.json();

    const updatedEmpleado = await prisma.empleado.update({
      where: {
        id: params.id,
      },
      data: {
        legajo,
        Nombre_completo,
        telefono,
        fecha_empleo,
        direccion,
        ciudad,
        email,
        Area,
        Horario,
        Turno,
      },
    });

    return NextResponse.json(updatedEmpleado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Empleado not found",
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
