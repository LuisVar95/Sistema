import express from 'express';
import {
  obtenerEsquejes,
  obtenerEsqueje,
  crearEsqueje,
  editarEsqueje,
  eliminarEsqueje,
} from '../controllers/esquejeController.js';

const router = express.Router();

router.get('/esquejes', obtenerEsquejes);
router.get('/esquejes/:id', obtenerEsqueje);
router.post('/esquejes', crearEsqueje);
router.put('/esquejes/:id', editarEsqueje);
router.delete('/esquejes/:id', eliminarEsqueje);

export default router;
