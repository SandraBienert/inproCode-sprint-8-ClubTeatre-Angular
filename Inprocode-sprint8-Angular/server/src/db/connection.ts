import { Sequelize } from "sequelize";



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('membres', 'root', '822025Clave%', {
  host: 'localhost',
  dialect: 'mysql',
});



export default sequelize;