import express from 'express';
import {
  obtenerPlantas,
  crearPlanta,
  editarPlanta,
  eliminarPlanta,
} from '../controllers/plantasControoler.js';

const router = express.Router();

router.get('/plantas', obtenerPlantas);
router.post('/plantas/crear', crearPlanta);
router.put('/plantas/editar/:id', editarPlanta);
router.delete('/plantas/eliminar/:id', eliminarPlanta);

export default router;
