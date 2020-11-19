module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: process.env.DB_PASS,
  DB: 'sistemaProfessores',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
