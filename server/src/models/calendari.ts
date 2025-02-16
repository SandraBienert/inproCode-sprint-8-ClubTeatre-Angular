import { DataTypes } from 'sequelize';
import calendari from '../db/connection';

const agenda = calendari.define('calendari_debuts', {
    titol: { type: DataTypes.STRING, field: 'titol_event' },
    lloc: { type: DataTypes.STRING, field: 'lloc_event' },
    data: { type: DataTypes.DATE, field: 'data_event'} 
}, {
    tableName: 'calendari_debuts',
    timestamps: false,
});

export default agenda;