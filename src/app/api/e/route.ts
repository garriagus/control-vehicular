import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/*_______________
user este ejemplo
https://github.com/mfikricom/CRUD-Next.js-13-Prisma-PostgreSQL/blob/main/app/products/addProduct.tsx

docu oficial:

https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/src/pages/api/post/index.ts
__________________*/

export async function GET() {
    try {
        // Cambié la consulta para obtener empleados
        const empleados = await prisma.empleado.findMany();
        return NextResponse.json(empleados);
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
        const { legajo, Nombre_completo, telefono, fecha_empleo, direccion, ciudad, email, Area, Horario, Turno } = await request.json();

        // Creo el nuevo empleado
        const nuevoEmpleado = await prisma.empleado.create({
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

        return NextResponse.json(nuevoEmpleado);
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
