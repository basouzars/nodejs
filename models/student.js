const db = require('./db');
const Teacher = require('./teacher');

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

Student.belongsToMany(Teacher, { through: 'students_teachers' });

module.exports = Student;
