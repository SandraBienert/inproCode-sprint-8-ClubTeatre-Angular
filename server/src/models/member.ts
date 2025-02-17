import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Member = db.define('membres', { 
  nom: {
    type: DataTypes.STRING,
  },
  cognom: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.STRING,
  },
  payroll: {
    type: DataTypes.NUMBER,
  },

}, {
  createdAt: false,
  updatedAt: false
}
);

export default Member;