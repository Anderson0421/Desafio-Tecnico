import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { CarreraType } from "../types/type";
import { useParams } from "react-router-dom";

export default function DetailCarrera() {
    const { id } = useParams();
    const [carrera, setCarrera] = useState<CarreraType>();

    useEffect(() => {
        async function getCarrera() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/carreras/${id}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCarrera(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getCarrera();

    }, [id]);

    return (
        <Layout>
            <section className="ml-20 max-sm:pt-16 max-md:flex-col p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll flex gap-5">
                <div className="rounded-lg border border-gray-100 text-card-foreground w-1/2 max-md:w-full">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Detalle de la carrera seleccionada</h2>
                        </div>
                    </div>
                    <div className="p-6 grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor={carrera?.nombre}
                                >
                                    Nombre de la carrera
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                                    id="first-name"
                                    value={carrera?.nombre}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor={carrera?.duracion}
                                >
                                    Duracion
                                </label>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="duracion"
                                    value={carrera?.duracion}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="age"
                                >
                                    Descripcion de la carrera
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="descripcion"
                                    value={carrera?.descripcion}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
