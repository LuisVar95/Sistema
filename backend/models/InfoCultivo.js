import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const InfoCultivo = db.define(
  'info_cultivos',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_plantas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default InfoCultivo;
