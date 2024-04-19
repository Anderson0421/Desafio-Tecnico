import { useEffect, useState } from "react";
import DataTablePersonalizado from "../components/DataTable";
import Layout from "../layouts/layout";
import { AlumnoActualizaciones } from "../types/type";

export default function Registros() {

    const [registros, setRegistros] = useState<AlumnoActualizaciones[]>([])

    async function GetRegistros() {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos/actualizaciones')
        const data = await response.json()
        setRegistros(data)
    }
    useEffect(() => {
        GetRegistros()
    }, [])


    type Column = {
        header: string;
        accessorKey: keyof AlumnoActualizaciones;
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
            header: 'ID Alumno',
            accessorKey: 'alumno_id',
            meta: {
                align: 'center',
            },
        },
        {
            header: 'Modificacion',
            accessorKey: 'Modificacion',
            meta: {
                align: 'center',
            },
        },
        {
            header: 'Fecha de Creacion',
            accessorKey: 'Created_at',
            meta: {
                align: 'center',
            },
        },
    ];

    return (
        <Layout>
            <section className="ml-20 pb-32 max-sm:pt-16 p-5 max-sm:mx-5 max-sm:ml-0 h-screen overflow-y-scroll">
                <h1 className="py-3 text-3xl font-semibold text-blue-800 pb-10">
                    Registro de modificaciones
                </h1>
                <DataTablePersonalizado IsCRUD={false} href="alumnos" data={registros} columns={workspacesColumns}
                    functionProp={(id: number) => () => alert(id)}
                />
            </section>
        </Layout>
    )
}