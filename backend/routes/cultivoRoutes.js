import express from 'express';
import {
  obtenerCultivos,
  crearCultivo,
  editarCultivo,
  eliminarCultivo,
} from '../controllers/cultivoController.js';
const router = express.Router();
router.get('/cultivos', obtenerCultivos);
router.post('/cultivos/crear', crearCultivo);
router.put('/cultivos/editar/:id', editarCultivo);
router.delete('/cultivos/eliminar/:id', eliminarCultivo);
export default router;
