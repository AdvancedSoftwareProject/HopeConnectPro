const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully! ✅');
  } catch (error) {
    console.error(' Failed to connect to the database: ❌', error);
  }
})();

module.exports = sequelize;
