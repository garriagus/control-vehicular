import { Vehiculo } from "@prisma/client";
import { useVehiculos } from "@/context/VehiculoContext";
import { HiTrash, HiPencil } from "react-icons/hi";

function VehiculoCard({ vehiculo }: { vehiculo: Vehiculo }) {
  const { deleteVehiculo, setSelectedVehiculo } = useVehiculos();

  return (
    <div key={vehiculo.id} className="bg-slate-300 p-4 my-2 flex justify-between">
      <div>
        {/* Ajusta las propiedades según el modelo Vehiculo */}
        <h1 className="text-2xl font-bold">{vehiculo.patente}</h1>
        <p>Tipo: {vehiculo.tipo}</p>
        <p>Marca: {vehiculo.marca}</p>
        <p>Modelo: {vehiculo.modelo}</p>
        <p>Color: {vehiculo.color}</p>
        <p>Empleado ID: {vehiculo.empleadoId}</p>
        
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this vehiculo?")) {
              // Ajusta el ID según el tipo de ID que utilices en el modelo Vehiculo
              await deleteVehiculo(vehiculo.id);
            }
          }}
        >
          <HiTrash className="text-2xl text-red-600" />
        </button>
        <button
          onClick={() => {
            setSelectedVehiculo(vehiculo);
          }}
        >
          <HiPencil className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default VehiculoCard;
