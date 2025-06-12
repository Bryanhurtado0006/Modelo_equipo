// start/AuthUsuarioRoutes.ts
import router from '@adonisjs/core/services/router'
import AuthUsuarioController from '../../app/controller/AuthUsuarioController.js'
const auth = new AuthUsuarioController()

// Rutas simples
router.post('/register', (ctx) => auth.register(ctx))
router.post('/login', (ctx) => auth.login(ctx))
