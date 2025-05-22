import router from "@adonisjs/core/services/router";
import PresiController from "../../app/controller/PresiController.js";

const Presidente=new PresiController()
router.get('/presidente',Presidente.verPresi)
router.get('/presidente/:dni',Presidente.verPresiPorId)
router.post('/presidente',Presidente.crearPresi)
router.put('/presidente/:dni',Presidente.actualizarPresi)
router.delete('/presidente/:dni',Presidente.eliminarPresi)