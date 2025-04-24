import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  obtenerPlantas,
  obtenerPlanta,
  crearPlanta,
  editarPlanta,
  eliminarPlanta,
} from '../controllers/plantaController.js';
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
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};
const upload = multer({ storage, fileFilter });
const router = express.Router();
// Obtener todas las plantas
router.get('/plantas', obtenerPlantas);
// Obtener una sola planta por ID
router.get('/plantas/:id', obtenerPlanta);
// Crear una nueva planta
// Se espera que se envíen hasta 5 imágenes en el campo "photos"
// Y una imagen adicional en el campo "fotoPerfil"
router.post(
  '/plantas/crear',
  upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'fotoPerfil', maxCount: 1 },
  ]),
  crearPlanta
);
// Editar una planta (actualización opcional de imágenes)
router.put(
  '/plantas/editar/:id',
  upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'fotoPerfil', maxCount: 1 },
  ]),
  editarPlanta
);
// Eliminar una planta
router.delete('/plantas/eliminar/:id', eliminarPlanta);
export default router;
