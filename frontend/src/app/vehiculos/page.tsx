"use client"
// Importa los módulos necesarios
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";

// Cambia el nombre del componente y ajusta los props según sea necesario
export default function VehicleForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Manejador para enviar el formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Realiza la solicitud para agregar un vehículo a la API
      const response = await fetch("/api/vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Ajusta las propiedades del vehículo según tu modelo
          patente: e.currentTarget.patente.value,
          tipo: e.currentTarget.tipo.value,
          marca: e.currentTarget.marca.value,
          modelo: e.currentTarget.modelo.value,
          color: e.currentTarget.color.value,
          empleadoId: e.currentTarget.empleadoId.value,
        }),
      });

      setLoading(false);

      if (response.ok) {
        toast.success("Vehicle added successfully!");
        // Redirige a la página principal u otra página según tus necesidades
        router.push("/");
      } else {
        const { error } = await response.json();
        toast.error(error);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setLoading(false);
      toast.error("An error occurred while adding the vehicle.");
    }
  };

  return (
    <>
      {/* Formulario para agregar vehículos */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Campos del formulario para agregar vehículos */}
        <div>
          <label htmlFor="patente" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Patente
          </label>
          <input
            type="text"
            name="patente"
            id="patente"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ABC123"
            required
          />
        </div>
        
        <div>
          <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tipo
          </label>
          <input
            type="text"
            name="tipo"
            id="tipo"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sedán, SUV, etc."
            required
          />
        </div>

        {/* Repite este patrón para los demás campos del modelo Vehiculo (marca, modelo, color, empleadoId) */}
        
        {/* Botón de envío del formulario */}
        <button
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>Add Vehicle</p>
          )}
        </button>
      </form>
    </>
  );
}
