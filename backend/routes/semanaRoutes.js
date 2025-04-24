import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  crearSemana,
  obtenerSemanas,
} from '../controllers/semanaController.js';
// Configuración de almacenamiento de archivos con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
// Filtro para aceptar solamente archivos de imagen
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};
const upload = multer({ storage, fileFilter });
const router = express.Router();
// Ruta para crear una semana
router.post('/plantas/:plantaId/semanas', upload.single('foto'), crearSemana);
// Nueva ruta para obtener las semanas de una planta
router.get('/plantas/:plantaId/semanas', obtenerSemanas);
export default router;
