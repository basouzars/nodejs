const db = require('./db');

const Teacher = db.sequelize.define('teachers', {
  name: {
    type: db.Sequelize.STRING,
  },
  subject: {
    type: db.Sequelize.TEXT,
  },
});

module.exports = Teacher;
