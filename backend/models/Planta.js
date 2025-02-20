import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Planta = db.define(
  'plantas',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fotos: {
      type: DataTypes.STRING, // Para guardar URLs de las fotos
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Planta;
