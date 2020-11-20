const router = require('express').Router();
const teachers = require('../controllers/teacher');

module.exports = (app) => {
  // Create a new Teacher
  router.post('/', teachers.create);

  // Retrieve all Teachers
  router.get('/', teachers.findAll);

  // Retrieve all approved Teachers
  router.get('/approved', teachers.findAllApproved);

  // Retrieve a single Teacher with id
  router.get('/:id', teachers.findOne);

  // Update a Teacher with id
  router.put('/:id', teachers.update);

  // Delete a Teacher with id
  router.delete('/:id', teachers.delete);

  // Delete all Teachers
  router.delete('/', teachers.deleteAll);

  app.use('/teachers', router);
};
