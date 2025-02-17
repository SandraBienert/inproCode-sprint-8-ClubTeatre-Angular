
import { DataTypes } from 'sequelize';
import map from '../db/connection';

const mapaTeatres = map.define('teatres_bcn', {
    nom: {
        type: DataTypes.STRING
    },
    adreça: {
        type: DataTypes.STRING
    },
    latitud: {
        type: DataTypes.NUMBER
    },
    longitud: {
        type: DataTypes.NUMBER
    },
   
}, {
    createdAt: false,
    updatedAt: false  
});

export default mapaTeatres;