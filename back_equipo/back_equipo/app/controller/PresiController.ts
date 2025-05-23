import pgDatabase from "../db/pgDatabase.ts";

class PresiController{
    async verPresi({response}){
        const result = await pgDatabase.query("SELECT * FROM presidente");
        return response.json({mensaje: result.rows})
    }

    async verPresiPorId({params,response}){
        const id = params.id;
        const result = await pgDatabase.query("SELECT * FROM presidente WHERE dni = $1", [id])
        if (result){
            return response.status(200).json({mensaje: result.rows})
        }
        else{
            return response.status(404).json({mensaje: "No se encontraron resultados"})
        }
    }
    async crearPresi({request,response}){
        const {nombre}=await request.body();
        await pgDatabase.query("INSERT INTO presidente (nombre) VALUES ($1)", [nombre])
        return response.json({mensaje: "Presidente creado con exito", nombre})
    }
    async actualizarPresi({params,request,response}){
        const {nombre }=await request.body();
        await pgDatabase.query("UPDATE presidente SET nombre = $1 WHERE dni = $2", [nombre,params.dni])
        return response.json({mensaje: "Presidente actualizado con exito", nombre})
    }
    async eliminarPresi({params,}){
        const dni = params.dni
        await pgDatabase.query("DELETE FROM presidente WHERE dni = $1", [dni])
        return {mensaje: "Presidente eliminado con exito"}
    }
}
export default PresiController;