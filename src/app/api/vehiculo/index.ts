import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    const { patente, tipo, marca, modelo, color, empleadoId } = req.body;
    const result = await prisma.vehiculo.create({
        data: {
            patente,
            tipo,
            marca,
            modelo,
            color,
            empleadoId,
            // Otros campos según sea necesario
        },
    })
    return res.status(201).json(result)
}
