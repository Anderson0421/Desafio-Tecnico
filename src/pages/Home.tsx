import { useEffect, useState } from "react";
import DataTablePersonalizado from "../components/DataTable";
import Layout from "../layouts/layout";
import { AlumnoType } from "../types/type";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function Home() {
    const [Alumnos, setAlumnos] = useState<AlumnoType[]>([])

    async function GetAlumnos() {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos/')
        const data = await response.json()
        setAlumnos(data)
    }


    const handleModal = (id: number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el alumno?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://127.0.0.1:8000/api/alumnos/${id}/`, {
                        method: 'DELETE'
                    });

                    fetch(`http://127.0.0.1:8000/api/alumnos/${id}/`)
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'Alumno eliminado correctamente',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                            GetAlumnos();
                        });
                } catch (error) {
                    console.error('Error al borrar el alumno:', error);
                }
            }
        })
    };
    useEffect(() => {
        GetAlumnos()
    }, [])


    type Column = {
        header: string;
        accessorKey: keyof AlumnoType;
        meta: {
            align: string;
        };
    };

    const workspacesColumns: Column[] = [
        {
            header: 'ID',
            accessorKey: 'id',
            meta: {
                align: 'center'
            }
        },
        {
            header: 'Nombre',
            accessorKey: 'nombre',
            meta: {
                align: 'left'
            }
        },
        {
            header: 'Apellido',
            accessorKey: 'apellido',
            meta: {
                align: 'left'
            }
        },
        {
            header: 'DNI',
            accessorKey: 'DNI',
            meta: {
                align: 'center'
            }
        },
        {
            header: 'Edad',
            accessorKey: 'edad',
            meta: {
                align: 'center'
            }
        },
        {
            header: 'Correo',
            accessorKey: 'correo',
            meta: {
                align: 'left'
            }
        },
        {
            header: 'Fecha de inscripcion',
            accessorKey: 'fecha_inscripcion',
            meta: {
                align: 'center'
            }
        }
    ];

    return (
        <Layout>
            <section className="ml-20 pb-32 max-sm:pt-16 p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll">
                <div className="flex justify-between max-sm:flex-col max-sm:pb-10">
                    <h1 className="text-2xl py-3 pb-10">
                        Administracion de alumnos
                    </h1>
                    <Link to={"alumnos/crear/"} className="bg-blue-500 h-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crear alumno
                    </Link>
                </div>
                <DataTablePersonalizado href="alumnos" data={Alumnos} columns={workspacesColumns}
                    functionProp={(id: number) => () => handleModal(id)}
                />
            </section>
        </Layout>
    );
}