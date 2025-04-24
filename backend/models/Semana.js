import { DataTypes } from 'sequelize';
import db from '../config/db.js';
const Semana = db.define(
  'semanas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    textoExplicativo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    planta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export default Semana;
