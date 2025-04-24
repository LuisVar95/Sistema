import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import fs from 'fs';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import './models/Relaciones.js';
import plantaRoutes from './routes/plantaRoutes.js';
import cultivoRoutes from './routes/cultivoRoutes.js';
import semanaRoutes from './routes/semanaRoutes.js';
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
// Hacer io accesible globalmente
app.set('io', io);
app.use(express.json());
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Carpeta "uploads" creada');
}
app.use('/uploads', express.static('uploads'));
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión correcta a la base de datos');
} catch (error) {
  console.error('Error en la conexión a la base de datos:', error);
}
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de Cors'));
    }
  },
};
app.use(cors(corsOptions));
app.use('/api', plantaRoutes);
app.use('/api', cultivoRoutes);
app.use('/api', semanaRoutes);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
