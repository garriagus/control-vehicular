import { Vehiculo } from "@prisma/client";

// Cambia el nombre del tipo de vehículo
export type CreateVehiculo = Omit<Vehiculo, "id" | "createdAt" | "updatedAt">;

// Cambia el nombre del tipo de actualización
export type UpdateVehiculo = Partial<CreateVehiculo>;
