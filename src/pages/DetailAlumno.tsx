import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { AlumnoActualizaciones, AlumnoType, CarreraType } from "../types/type";
import { useParams } from "react-router-dom";

export default function DetailAlumno() {
    const { id } = useParams();
    const [alumno, setAlumno] = useState<AlumnoType>();
    const [carrera, setCarrera] = useState<CarreraType>();
    const [registros, setRegistros] = useState<AlumnoActualizaciones[]>([]);

    useEffect(() => {
        async function getAlumno() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/alumnos/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setAlumno(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function getCarrera() {
            try {
                const idCarerra = alumno?.carrera;
                const response = await fetch(`http://127.0.0.1:8000/api/carreras/${idCarerra}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCarrera(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function getRegistros() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/alumnos/actualizaciones/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setRegistros(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getCarrera();
        getAlumno();
        getRegistros();
    }, [id, alumno?.carrera]);

    return (
        <Layout>
            <section className="ml-20 max-sm:pt-16 max-md:flex-col p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll flex gap-5">
                <div className="rounded-lg border border-gray-100 text-card-foreground w-1/2 max-md:w-full">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Detalle de Alumno</h2>
                            <p className="text-gray-500 dark:text-gray-400">Información del alumno</p>
                        </div>
                    </div>
                    <div className="p-6 grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor={alumno?.nombre}
                                >
                                    Nombre
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                                    id="first-name"
                                    value={alumno?.nombre}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor={alumno?.apellido}
                                >
                                    Apellido
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="last-name"
                                    value={alumno?.apellido}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="age"
                                >
                                    Edad
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="age"
                                    value={alumno?.edad}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="dni"
                                >
                                    DNI
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="dni"
                                    value={alumno?.DNI}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    Correo
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="email"
                                    value={alumno?.correo}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="fecha_inscripcion"
                                >
                                    Fecha de inscripcion
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="fecha_inscripcion"
                                    value={alumno?.fecha_inscripcion}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    Direccion
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="email"
                                    value={alumno?.direccion}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="carrera"
                                >
                                    Carrera
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="carrera"
                                    value={carrera?.nombre}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="w-1/2 max-md:w-full">
                    <div className="flex flex-col border border-gray-100  space-y-1.5 p-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">
                                Registros del Alumno
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Información de registros del alumno
                            </p>
                        </div>
                    </div>
                    <div className="p-6 grid gap-4">
                        {
                            registros.length > 0 ?
                                registros.map((registro) => (
                                    <div key={registro.id} className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor={registro.Modificacion}
                                            >
                                                Modificacion
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                id="Modificacion"
                                                value={registro.Modificacion}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor={registro.Created_at}
                                            >
                                                Fecha de registro
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                id="Created_at"
                                                value={registro.Created_at}
                                            />
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="flex justify-center items-center h-20">
                                    <p>No hay registros</p>
                                </div>
                        }
                    </div>
                </div>
            </section>
        </Layout>
    );
}
