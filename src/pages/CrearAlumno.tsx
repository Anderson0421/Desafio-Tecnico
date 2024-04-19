import { useForm } from "react-hook-form";
import { AlumnoType } from "../types/type";
import Layout from "../layouts/layout";
import { Input, Button } from "@nextui-org/react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function MySwalAlert() {
    MySwal.fire({
        title: 'Alumno creado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
function MySwalError(errores: string) {
    MySwal.fire({
        title: 'Error al actualizar el alumno',
        icon: 'error',
        text: errores,
        confirmButtonText: 'OK'
    })
}

export default function CrearAlumno() {

    const { register, handleSubmit, formState: { errors } } = useForm<AlumnoType>();


    const onSubmit = async (data: AlumnoType) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/alumnos/`, {
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
                    Crear alumno
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 w-3/4" >
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Input type="text" {...register("nombre", { required: true })} label="Nombre"  className="input-field" />
                            {errors.nombre && <span className="text-red-500">El nombre es requerido</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="text" {...register("apellido", { required: true })} label="Apellido"  className="input-field" />
                            {errors.apellido && <span className="text-red-500">El apellido es requerido</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2  mt-5 gap-4">
                        <div className="space-y-2 ">
                            <Input type="number" {...register("DNI", { required: true, minLength: 7, maxLength: 8 })} label="DNI" className="input-field" />
                            {errors.DNI && errors.DNI.type === "required" && <span className="text-red-500">El DNI es requerido</span>}
                            {errors.DNI && errors.DNI.type === "minLength" && <span className="text-red-500">El DNI debe tener al menos 7 dígitos</span>}
                            {errors.DNI && errors.DNI.type === "maxLength" && <span className="text-red-500">El DNI debe tener máximo 8 dígitos</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="number" label="Edad" {...register("edad", { required: true, min: 18 })} className="input-field" />
                            {errors.edad && <span className="text-red-500">La edad es requerida y debe ser mayor de 18 años</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1  mt-5 gap-4">
                        <div className="space-y-2">
                            <Input type="text" label="Carrera" {...register("carrera", { required: true })}  className="input-field" />
                            {errors.carrera && <span className="text-red-500">La carrera es requerida</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="email" label="Correo" {...register("correo", { required: true })}  className="input-field" />
                            {errors.correo && <span className="text-red-500">El correo es requerido</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="text" label="Direccion" {...register("direccion", { required: true })}  className="input-field" />
                            {errors.direccion && <span className="text-red-500">La dirección es requerida</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="number" label="Telefono" {...register("telefono", { required: true })}  className="input-field" />
                            {errors.telefono && <span className="text-red-500">El teléfono es requerido</span>}
                        </div>
                        <div className="space-y-2">
                            <Input type="date" label="Fecha de inscripcion" {...register("fecha_inscripcion", { required: true })} className="input-field" />
                            {errors.fecha_inscripcion && <span className="text-red-500">La fecha de inscripción es requerida</span>}
                        </div>
                    </div>
                    <Button color="success" type="submit" className="text-gray-100 mt-5">Guardar</Button>
                </form>
            </section>
        </Layout>
    );
}
