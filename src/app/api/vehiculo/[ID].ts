import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const vehiculoId = req.query.id // Cambié el nombre de la variable a vehiculoId

    switch (req.method) {
        case 'DELETE':
            return handleDELETE(vehiculoId, res) // Pasé vehiculoId en lugar de postId

        default:
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`,
            )
    }
}

// DELETE /api/vehiculo/:id
async function handleDELETE(vehiculoId: unknown, res: NextApiResponse<any>) {
    const vehiculo = await prisma.vehiculo.delete({ // Cambié el nombre del modelo a vehiculo
        where: { id: String(vehiculoId) },
    })
    return res.json(vehiculo)
}
