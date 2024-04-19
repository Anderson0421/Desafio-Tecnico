import { useEffect, useState } from "react";
import DataTablePersonalizado from "../components/DataTable";
import Layout from "../layouts/layout";
import { CarreraType } from "../types/type";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Carreras() {

    const [carreras, setCarreras] = useState<CarreraType[]>([])

    async function getCarreras() {
        const response = await fetch('http://127.0.0.1:8000/api/carreras/')
        const data = await response.json()
        setCarreras(data)
    }
    useEffect(() => {
        getCarreras()
    }, [])


    type Column = {
        header: string;
        accessorKey: keyof CarreraType;
        meta: {
            align: string;
        };
    };


    const workspacesColumns: Column[] = [
        {
            header: 'ID',
            accessorKey: 'id',
            meta: {
                align: 'center',
            },
        },
        {
            header: 'Nombre',
            accessorKey: 'nombre',
            meta: {
                align: 'center',
            },
        },
        {
            header: 'Duracion',
            accessorKey: 'duracion',
            meta: {
                align: 'center',
            },
        },
        {
            header: 'Descripcion',
            accessorKey: 'descripcion',
            meta: {
                align: 'center',
            },
        },
    ];

    const handleModal = (id: number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar la carrera?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://127.0.0.1:8000/api/carreras/${id}/`, {
                        method: 'DELETE'
                    });

                    fetch(`http://127.0.0.1:8000/api/carreras/${id}/`)
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                title: 'Carrera eliminado correctamente',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                            getCarreras();
                        });
                } catch (error) {
                    console.error('Error al borrar la carrera:', error);
                }
            }
        })
    };
    useEffect(() => {
        getCarreras()
    }, [])


    return (
        <Layout>
            <section className="ml-20 pb-32 max-sm:pt-16 p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll">
                <div className="flex justify-between max-sm:flex-col max-sm:pb-10">
                    <h1 className="text-2xl py-3 pb-10">
                        Administracion de carreras
                    </h1>
                    <Link to={"/carreras/crear/"} className="bg-blue-500 h-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crear carrera
                    </Link>
                </div>

                <DataTablePersonalizado IsCRUD={true} href="../carreras" data={carreras} columns={workspacesColumns}
                    functionProp={(id: number) => () => handleModal(id)}
                />
            </section>
        </Layout>
    )
}