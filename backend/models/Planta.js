import { DataTypes } from 'sequelize';
import db from '../config/db.js';
const Planta = db.define(
  'plantas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    variedad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    info_planta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fotos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    fotoPerfil: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cultivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Nuevo campo "tipo"
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'semilla', // Opcional: puedes definir un valor por defecto
    },
  },
  {
    timestamps: false,
  }
);
export default Planta;
