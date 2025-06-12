import router from "@adonisjs/core/services/router";
import PresiController from "../../app/controller/PresiController.js";
import EquiposController from "../../app/controller/EquiposController.js";

const Presidente = new PresiController();
router.get('/presidente', Presidente.verPresi);
router.get('/presidente/:dni', Presidente.verPresiPorId);
router.post('/presidente', Presidente.crearPresi);
router.put('/presidente/:dni', Presidente.actualizarPresi);
router.delete('/presidente/:dni', Presidente.eliminarPresi);

const Equipos = new EquiposController();
router.get('/equipos', Equipos.ver_equipos);
router.get('/equipos/:codigo', Equipos.mostrar_Equipos);
router.post('/equipos', Equipos.crear_equipos);
router.put('/equipos/:codigo', Equipos.actualizar_Equipo);
router.delete('/equipos/:codigo', Equipos.eliminar_Equipo);