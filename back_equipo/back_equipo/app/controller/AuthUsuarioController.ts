import Database from '../db/pgDatabase.js'
import hash from '@adonisjs/core/services/hash'

class AuthUsuarioController {
  // Registro
  async register({ request, response }) {
    try {
      const { email, password, nombre, telefono } = request.body()

      if (!email || !password || !nombre || !telefono) {
        return response.status(400).json({ msj: "Todos los campos son obligatorios" })
      }

      const newpass = await hash.make(password)

      const res = await Database.query(
        "INSERT INTO usuarios(email, password, nombre, telefono) VALUES($1, $2, $3, $4)",
        [email, newpass, nombre, telefono]
      )

      if (res.rowCount > 0) {
        return response.json({ msj: "Registrado correctamente", email })
      } else {
        return response.status(500).json({ msj: "No se pudo registrar" })
      }

    } catch (error) {
      console.error("Error en registro:", error)
      return response.status(500).json({ msj: "Error interno", error: error.message })
    }
  }

  // Login
  async login({ request, response }) {
    try {
      const { email, password } = request.body()

      if (!email || !password) {
        return response.status(400).json({ msj: "Correo y contraseña son obligatorios" })
      }

      const res = await Database.query("SELECT * FROM usuarios WHERE email = $1", [email])

      if (res.rows.length === 0) {
        return response.status(404).json({ msj: "Usuario no encontrado" })
      }

      const usuario = res.rows[0]
      const valid = await hash.verify(usuario.password, password)

      if (valid) {
        return response.json({ msj: "Usuario logeado correctamente" })
      } else {
        return response.status(401).json({ msj: "Contraseña incorrecta" })
      }

    } catch (error) {
      console.error("Error en login:", error)
      return response.status(500).json({ msj: "Error interno", error: error.message })
    }
  }
}

export default AuthUsuarioController
