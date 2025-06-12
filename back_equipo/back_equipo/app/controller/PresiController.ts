// app/controller/PresiController.ts - SIN IF NI TRY
import pgDatabase from "../db/pgDatabase.ts";

class PresiController {
    async verPresi({ response }) {
        const result = await pgDatabase.query("SELECT * FROM presidente");
        return response.json({ mensaje: result.rows });
    }

    async verPresiPorId({ params, response }) {
        const dni = params.dni;
        const result = await pgDatabase.query("SELECT * FROM presidente WHERE dni = $1", [dni]);
        return response.json({ mensaje: result.rows[0] }); // No verifica si existe
    }

    async crearPresi({ request, response }) {
        const { nombre } = await request.body();
        await pgDatabase.query("INSERT INTO presidente (nombre) VALUES ($1)", [nombre]);
        return response.json({ mensaje: "Presidente creado con exito", nombre });
    }

    async actualizarPresi({ params, request, response }) {
        const dni = params.dni;
        const { nombre } = await request.body();
        await pgDatabase.query("UPDATE presidente SET nombre = $1 WHERE dni = $2", [nombre, dni]);
        return response.json({ mensaje: "Presidente actualizado con exito", nombre });
    }

    async eliminarPresi({ params, response }) {
        const dni = params.dni;
        await pgDatabase.query("DELETE FROM presidente WHERE dni = $1", [dni]);
        return response.json({ mensaje: "Presidente eliminado con exito" });
    }
}
export default PresiController;