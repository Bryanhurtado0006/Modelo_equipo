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

  // simple validacion
  if (!nombre || !nombre.trim()) {
    return response.status(400).json({ mensaje: "el nombre no puede estar vacío." });
  }

  if (!anio_fundacion || anio_fundacion <= 0) {
    return response.status(400).json({ mensaje: "año de fundación inválido." });
  }

  if (!dni_presidente || isNaN(dni_presidente)) {
    return response.status(400).json({ mensaje: "dni del presidente inválido." });
  }

  // Validar si ya está asignado
  const existe = await pgDatabase.query(
    `SELECT * FROM equipo WHERE dni_presidente = $1`,
    [dni_presidente]
  );

  if (existe.rows.length > 0) {
    return response.status(400).json({ mensaje: "Ese presidente ya está asignado a un equipo." });
  }

  // Insertar
  await pgDatabase.query(
    `INSERT INTO equipo(nombre, anio_fundacion, dni_presidente) VALUES ($1,$2,$3)`,
    [nombre.trim(), anio_fundacion, dni_presidente]
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