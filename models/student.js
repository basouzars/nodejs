const db = require('./db');

const Student = db.sequelize.define('students', {
  name: {
    type: db.Sequelize.STRING,
  },
  birthday: {
    type: db.Sequelize.STRING,
  },
  points: {
    type: db.Sequelize.INTEGER,
  },
  email: {
    type: db.Sequelize.STRING,
  },
  approved: {
    type: db.Sequelize.BOOLEAN,
  },
});

module.exports = Student;
