import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const InfoPlanta = db.define(
  'info_plantas',
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    riego: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    defectos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    virtudes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fertilizacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ph: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ec: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    planta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'plantas',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

export default InfoPlanta;
