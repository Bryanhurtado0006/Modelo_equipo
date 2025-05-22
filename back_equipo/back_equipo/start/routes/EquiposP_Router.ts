import router from "@adonisjs/core/services/router";
import PresiController from "../../app/controller/PresiController.js";
import EquiposController from "../../app/controller/EquiposController.js";

const Presidente=new PresiController()
router.get('/presidente',Presidente.verPresi)
router.get('/presidente/:dni',Presidente.verPresiPorId)
router.post('/presidente',Presidente.crearPresi)
router.put('/presidente/:dni',Presidente.actualizarPresi)
router.delete('/presidente/:dni',Presidente.eliminarPresi)


// equipos

const Equipos=new EquiposController()

router.get('/verEquipos' , Equipos.ver_equipos);
router.get('/MostrarEquipos/:codigo',Equipos.mostrar_Equipos);
router.post('/crear_equipos',Equipos.crear_equipos);
router.put('/Act_equipos',Equipos.actualizar_Equipo);
router.delete('/delete/:codigo',Equipos.eliminar_Equipo);