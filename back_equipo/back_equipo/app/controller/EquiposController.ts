import { json } from "stream/consumers";
import pgDatabase from "../db/pgDatabase.ts";

export default class EquiposController{
    //select*from equipos

    async ver_equipos({response}){


        const resul=await pgDatabase.query('select * from equipo')
        return response.json({MENSAJE: resul.rows})
    }


    async crear_equipos({request,response}){
        const {nombre,anio_fundacion,dni_presidente}=request.body();
        if(
            !nombre||typeof nombre!== "string"||nombre.length === 0 ||
            !anio_fundacion||typeof anio_fundacion!== "number" || anio_fundacion.toString().length!== 4 ||
            !dni_presidente||isNaN(dni_presidente)

        ){
            return response.status(400).json({mensaje:"DATOS INVALIDOS BOBA"});
        } try{
            const resul=await pgDatabase.query(
                `INSERT INTO  equipo(nombre, anio_fundacion, dni_presidente) VALUES ($1,$2,$3)`,
                 [nombre,anio_fundacion,dni_presidente]
            );
            if (resul.rowCount>0){
                return response.status(201).json({ mensaje: "Equipo creado exitosamente" });
            }else {
            return response.status(500).json({ mensaje: "Error al crear el equipo" });
        } 


        }catch (error) {
        console.error(error);
        return response.status(500).json({ mensaje: "Error en la base de datos" });
    }

    }

    async mostrar_Equipos({params}){
        const codigo=params.codigo
        const resul=await pgDatabase.query('select * from equipo where codigo=$1',[codigo])
        return resul.rows[0] || {mensaje: 'equipo no encontrado'}
    }

    async actualizar_Equipo({params,request}){

        
        const codigo=params.codigo
        const {nombre,anio_fundacion,dni_presidente}=await request.body();
        await pgDatabase.query('UPDATE equipo SET nombre=$1, anio_fundacion=$2, dni_presidente=$3 WHERE nombre=$4',[nombre,anio_fundacion,dni_presidente,codigo]);
        return{ mensaje: 'equipo actualizado correctamente'}

    }

    async eliminar_Equipo({params}){
        const codigo=params.codigo
        await pgDatabase.query('DELETE FROM equipo WHERE codigo=$1',[codigo])
        return { mensaje:'Equipo eliminado' }
    }




}