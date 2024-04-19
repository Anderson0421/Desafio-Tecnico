import { useForm } from "react-hook-form";
import { AlumnoType, CarreraType } from "../types/type";
import Layout from "../layouts/layout";
import { Input, Button } from "@nextui-org/react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function MySwalAlert() {
    MySwal.fire({
        title: 'Carrera creado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
function MySwalError(errores: string) {
    MySwal.fire({
        title: 'Error al actualizar la carrera',
        icon: 'error',
        text: errores,
        confirmButtonText: 'OK'
    })
}

export default function CrearCarrera() {

    const { register, handleSubmit, formState: { errors } } = useForm<CarreraType>();


    const onSubmit = async (data: CarreraType) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/carreras/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                MySwalAlert();
            } else {
                // Mostrar errores
                const data = await response.json();
                let errores = "";
                for (const key in data) {
                    errores += `${key}: ${data[key]}\n`;
                }
                MySwalError(errores);

            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    return (
        <Layout>
            <section className="ml-20 max-sm:pt-16 max-md:flex-col p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll ">
                <h1 className="text-3xl text-blue-900  flex items-center font-semibold mb-10 gap-3">
                    Crear carrera
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 w-3/4" >
                    <div className="grid grid-cols-1  mt-5 gap-4">
                        <div className="space-y-2">
                            <Input type="text" label="Nombre" {...register("nombre", { required: true })} className="input-field" />
                            {errors.nombre && <span className="text-red-500">El nombre es requerida</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="number" label="Duracion" {...register("duracion", { required: true })} className="input-field" />
                            {errors.duracion && <span className="text-red-500">La duracion es requerido</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="text" label="Descripcion" {...register("descripcion", { required: true })} className="input-field" />
                            {errors.descripcion && <span className="text-red-500">La descripcion es requerida</span>}
                        </div>
                    </div>
                    <Button color="success" type="submit" className="text-gray-100 mt-5">Guardar</Button>
                </form>
            </section>
        </Layout>
    );
}
