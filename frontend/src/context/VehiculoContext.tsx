// Importa createContext, useState, useContext desde "react"
import { createContext, useState, useContext } from "react";
import { CreateVehiculo, UpdateVehiculo } from "@/interfaces/Vehiculo"; // Asegúrate de importar los tipos correctos
import { Vehiculo } from "@prisma/client";

export const VehiculoContext = createContext<{
  vehiculos: Vehiculo[];
  loadVehiculos: () => Promise<void>;
  createVehiculo: (vehiculo: CreateVehiculo) => Promise<void>;
  deleteVehiculo: (id: string) => Promise<void>;
  selectedVehiculo: Vehiculo | null;
  setSelectedVehiculo: (vehiculo: Vehiculo | null) => void;
  updateVehiculo: (id: string, vehiculo: UpdateVehiculo) => Promise<void>;
}>({
  vehiculos: [],
  loadVehiculos: async () => {},
  createVehiculo: async (vehiculo: CreateVehiculo) => {},
  deleteVehiculo: async (id: string) => {},
  selectedVehiculo: null,
  setSelectedVehiculo: (vehiculo: Vehiculo | null) => {},
  updateVehiculo: async (id: string, vehiculo: UpdateVehiculo) => {},
});

export const useVehiculos = () => {
  const context = useContext(VehiculoContext);
  if (!context) {
    throw new Error("useVehiculos must be used within a VehiculosProvider");
  }
  return context;
};

export const VehiculosProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo | null>(null);

  async function loadVehiculos() {
    const res = await fetch("/api/vehiculos");
    const data = await res.json();
    setVehiculos(data);
  }

  async function createVehiculo(vehiculo: CreateVehiculo) {
    const res = await fetch("/api/vehiculos", {
      method: "POST",
      body: JSON.stringify(vehiculo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newVehiculo = await res.json();
    setVehiculos([...vehiculos, newVehiculo]);
  }

  async function deleteVehiculo(id: string) {
    const res = await fetch("/api/vehiculos/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
  }

  async function updateVehiculo(id: string, vehiculo: UpdateVehiculo) {
    const res = await fetch("/api/vehiculos/" + id, {
      method: "PUT",
      body: JSON.stringify(vehiculo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setVehiculos(vehiculos.map((vehiculo) => (vehiculo.id === id ? data : vehiculo)));
  }

  return (
    <VehiculoContext.Provider
      value={{
        vehiculos,
        loadVehiculos,
        createVehiculo,
        deleteVehiculo,
        selectedVehiculo,
        setSelectedVehiculo,
        updateVehiculo,
      }}
    >
      {children}
    </VehiculoContext.Provider>
  );
};
