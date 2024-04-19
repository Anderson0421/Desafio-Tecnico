
export interface CarreraType{
    nombre: string;
    duracion: number;
    descripcion: string;
}

export interface AlumnoType{
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    direccion: string;
    correo: string;
    telefono: number;
    DNI: number;
    carrera: CarreraType.nombre;
    fecha_inscripcion: string;
}

export interface AlumnoActualizaciones{
    id: number;
    alumno_id: number;
    Modificacion: string;
    Created_at: string;
}