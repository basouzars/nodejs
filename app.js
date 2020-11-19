require('dotenv').config();

const express = require('express');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sistemaProfessores', 'root', process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate().then(()=>{
  console.log('Success!');
}).catch((error) => {
  console.log(`Erros: ${error}`);
});

const app = express();

app.get('/', (req, res) => {
  res.send('hellow express world');
});

app.listen(3000, () => {
  console.log('hellow world');
});
