const router = require('express').Router();
const students = require('../controllers/student');

module.exports = (app) => {
  // Create a new Student
  router.post('/', students.create);

  // Retrieve all Students
  router.get('/', students.findAll);

  // Retrieve all approved Students
  router.get('/approved', students.findAllApproved);

  // Retrieve a single Student with id
  router.get('/:id', students.findOne);

  // Update a Student with id
  router.put('/:id', students.update);

  // Delete a Student with id
  router.delete('/:id', students.delete);

  // Delete all Students
  router.delete('/', students.deleteAll);

  app.use('/students', router);
};
