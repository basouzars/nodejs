const db = require('../models/db');
const Teacher = require('../models/teacher');

const { Op } = db.Sequelize;

// Create and Save a new Teacher
exports.create = (req, res) => {
  if (!req.body.name || !req.body.subject) {
    res.status(400).send({
      message: 'Missing one or more requirements: name, subject',
    });
    return;
  }

  const teacher = {
    name: req.body.name,
    subject: req.body.subject,
  };

  Teacher.create(teacher)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Teacher.',
      });
    });
};

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {
  const { name } = req.query;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Teacher.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving teachers.',
      });
    });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Teacher.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Teacher with id:${id}`,
      });
    });
};

// Update a Teacher by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Teacher.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Teacher was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Teacher with id:${id}. Maybe Teacher was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Teacher with id:${id}`,
      });
    });
};

// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Teacher.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Teacher was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id:${id}. Maybe Teacher was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Teacher with id: ${id}`,
      });
    });
};

// Delete all Teachers from the database.
exports.deleteAll = (req, res) => {
  Teacher.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Teachers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all teachers.',
      });
    });
};

// Find all approved Teachers
exports.findAllApproved = (req, res) => {
  Teacher.findAll({ where: { approved: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving teachers.',
      });
    });
};
