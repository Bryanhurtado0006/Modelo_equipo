// app/controller/EquiposController.ts - SIN IF NI TRY
import pgDatabase from "../db/pgDatabase.ts";

export default class EquiposController {
    async ver_equipos({ response }) {
        const resul = await pgDatabase.query(`
            SELECT
                e.codigo,
                e.nombre AS nombre_equipo,
                e.anio_fundacion,
                e.dni_presidente,
                p.nombre AS nombre_presidente
            FROM
                equipo e
            JOIN
                presidente p ON e.dni_presidente = p.dni
        `);
        return response.json({ MENSAJE: resul.rows });
    }

    async crear_equipos({ request, response }) {
        const { nombre, anio_fundacion, dni_presidente } = request.body();
        await pgDatabase.query(
            `INSERT INTO equipo(nombre, anio_fundacion, dni_presidente) VALUES ($1,$2,$3)`,
            [nombre, anio_fundacion, dni_presidente]
        );
        return response.status(201).json({ mensaje: "Equipo creado exitosamente" });
    }

    async mostrar_Equipos({ params, response }) {
        const codigo = params.codigo;
        const resul = await pgDatabase.query('SELECT * FROM equipo WHERE codigo=$1', [codigo]);
        return response.json({ mensaje: resul.rows[0] }); // No verifica si existe
    }

    async actualizar_Equipo({ params, request, response }) {
        const codigo = params.codigo;
        const { nombre, anio_fundacion, dni_presidente } = await request.body();
        await pgDatabase.query('UPDATE equipo SET nombre=$1, anio_fundacion=$2, dni_presidente=$3 WHERE codigo=$4', [nombre, anio_fundacion, dni_presidente, codigo]);
        return response.json({ mensaje: 'Equipo actualizado correctamente' });
    }

    async eliminar_Equipo({ params, response }) {
        const codigo = params.codigo;
        await pgDatabase.query('DELETE FROM equipo WHERE codigo=$1', [codigo]);
        return response.json({ mensaje: 'Equipo eliminado' });
    }
}