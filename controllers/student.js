const parseISO = require('date-fns');
const db = require('../models/db');
const Student = require('../models/student');

const { Op } = db.Sequelize;

// Create and Save a new Student
exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.birthday) {
    res.status(400).send({
      message: 'Missing one or more requirements: name, email, birthday',
    });
    return;
  }

  const student = {
    name: req.body.name,
    birthday: parseISO(req.body.birthday),
    email: req.body.email,
    approved: req.body.approved ? req.body.approved : false,
    points: req.body.points ? req.body.points : 0,
  };

  Student.create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Student.',
      });
    });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  const { name } = req.query;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Student.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving students.',
      });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Student.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Student with id:${id}`,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Student.update(req.body, {
    where: { id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: 'Student was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Student with id:${id}. Maybe Student was not found or req.body is empty!`,
      });
    }
  }).catch(() => {
    res.status(500).send({
      message: `Error updating Student with id:${id}`,
    });
  });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Student.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Student was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Student with id:${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Student with id: ${id}`,
      });
    });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Students were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all students.',
      });
    });
};

// Find all approved Students
exports.findAllApproved = (req, res) => {
  Student.findAll({ where: { approved: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving students.',
      });
    });
};
