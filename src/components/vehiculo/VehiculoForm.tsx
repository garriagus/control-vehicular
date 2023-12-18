"use client";
import { useState, useRef, useEffect } from "react";

import { useVehiculos } from "@/context/VehiculoContext";

// Cambia la función del componente de NoteForm a VehiculoForm
function VehiculoForm() {
  // Cambia el estado de title y content a patente, tipo, marca, modelo, color, empleadoId
  const [patente, setPatente] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [empleadoId, setEmpleadoId] = useState("");

  // Cambia el nombre del ref a patenteRef
  const patenteRef = useRef<HTMLInputElement>(null);

  // Utiliza useVehiculos en lugar de useNotes
  const {
    createVehiculo,
    selectedVehiculo,
    setSelectedVehiculo,
    updateVehiculo,
  } = useVehiculos();

  useEffect(() => {
    if (selectedVehiculo) {
      setPatente(selectedVehiculo.patente);
      setTipo(selectedVehiculo.tipo);
      setMarca(selectedVehiculo.marca);
      setModelo(selectedVehiculo.modelo);
      setColor(selectedVehiculo.color);
      setEmpleadoId(selectedVehiculo.empleadoId || "");
    }
  }, [selectedVehiculo]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedVehiculo) {
          await updateVehiculo(selectedVehiculo.id, {
            patente,
            tipo,
            marca,
            modelo,
            color,
            empleadoId,
          });
          setSelectedVehiculo(null);
        } else {
          await createVehiculo({
            patente,
            tipo,
            marca,
            modelo,
            color,
            empleadoId,
          });
        }

        setPatente("");
        setTipo("");
        setMarca("");
        setModelo("");
        setColor("");
        setEmpleadoId("");

        patenteRef.current?.focus();
      }}
    >
      {/* Cambia la entrada de texto a patente */}
      <input
        type="text"
        name="patente"
        autoFocus
        placeholder="Patente"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setPatente(e.target.value)}
        value={patente}
        ref={patenteRef}
      />

      {/* Agrega campos adicionales para tipo, marca, modelo, color, empleadoId */}
      <input
        type="text"
        name="tipo"
        placeholder="Tipo"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTipo(e.target.value)}
        value={tipo}
      />
      <input
        type="text"
        name="marca"
        placeholder="Marca"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setMarca(e.target.value)}
        value={marca}
      />
      <input
        type="text"
        name="modelo"
        placeholder="Modelo"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setModelo(e.target.value)}
        value={modelo}
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      <input
        type="text"
        name="empleadoId"
        placeholder="Empleado ID"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setEmpleadoId(e.target.value)}
        value={empleadoId}
      />

      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !patente || !tipo || !marca || !modelo || !color || !empleadoId
          }
          type="submit"
        >
          {selectedVehiculo ? "Update" : "Create"}
        </button>

        {selectedVehiculo && (
          <button
            className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
            type="button"
            onClick={() => {
              setSelectedVehiculo(null);
              setPatente("");
              setTipo("");
              setMarca("");
              setModelo("");
              setColor("");
              setEmpleadoId("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default VehiculoForm;
