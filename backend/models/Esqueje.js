import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Esqueje = db.define(
  'esquejes',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_corte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planta_madre_id: {
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

export default Esqueje;
