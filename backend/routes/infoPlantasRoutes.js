import express from 'express';
import {
  obtenerInfoPlantas,
  crearInfoPlanta,
  editarInfoPlanta,
  eliminarInfoPlanta,
} from '../controllers/infoPlantaController.js';

const router = express.Router();

router.get('/info-plantas', obtenerInfoPlantas);
router.post('/info-plantas/crear', crearInfoPlanta);
router.put('/info-plantas/editar/:id', editarInfoPlanta);
router.delete('/info-plantas/eliminar/:id', eliminarInfoPlanta);

export default router;
