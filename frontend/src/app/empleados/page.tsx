"use client"
// Importa los módulos necesarios
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";

// Cambia el nombre del componente y ajusta los props según sea necesario
export default function EmployeeForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Manejador para enviar el formulario
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Realiza la solicitud para agregar un empleado a la API
            const response = await fetch("/api/empleado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Ajusta las propiedades del empleado según tu modelo
                    legajo: e.currentTarget.legajo.value,
                    Nombre_completo: e.currentTarget.Nombre_completo.value,
                    telefono: e.currentTarget.telefono.value,
                    fecha_empleo: e.currentTarget.fecha_empleo.value,
                    direccion: e.currentTarget.direccion.value,
                    ciudad: e.currentTarget.ciudad.value,
                    email: e.currentTarget.email.value,
                    Area: e.currentTarget.Area.value,
                    Horario: e.currentTarget.Horario.value,
                    Turno: e.currentTarget.Turno.value,
                }),
            });

            setLoading(false);

            if (response.ok) {
                toast.success("Employee added successfully!");
                // Redirige a la página principal u otra página según tus necesidades
                router.push("/");
            } else {
                const { error } = await response.json();
                toast.error(error);
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            setLoading(false);
            toast.error("An error occurred while adding the employee.");
        }
    };

    return (
        <>
            {/* Formulario para agregar empleados */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Campos del formulario para agregar empleados */}
                <div>
                    <label htmlFor="legajo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Legajo
                    </label>
                    <input
                        type="text"
                        name="legajo"
                        id="legajo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123456"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Nombre_completo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        name="Nombre_completo"
                        id="Nombre_completo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nombre Apellido"
                        required
                    />
                </div>

                {/* Repite este patrón para los demás campos del modelo Empleado (telefono, fecha_empleo, direccion, ciudad, email, Area, Horario, Turno) */}

                {/* Botón de envío del formulario */}
                <button
                    disabled={loading}
                    className={`${loading
                            ? "cursor-not-allowed border-gray-200 bg-gray-100"
                            : "border-black bg-black text-white hover:bg-white hover:text-black"
                        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                >
                    {loading ? (
                        <LoadingDots color="#808080" />
                    ) : (
                        <p>Add Employee</p>
                    )}
                </button>
            </form>
        </>
    );
}
