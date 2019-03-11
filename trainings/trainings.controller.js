const express = require('express');
const router = express.Router();
const trainingService = require('./training.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const db = require('_helpers/db');
// routes
router.get('/',authorize([Role.Admin, Role.TL]),  getAllTrainings);
router.get('/:id',authorize([Role.Admin]),  getTrainingById);
router.post('/',authorize([Role.Admin]),  createTraining);


module.exports = router;

function getAllTrainings(req, res, next) {
    db.query('select * from trainings ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })

}

function createTraining(req, res, next) {
    trainingService.createTraining(req.body)
    .then(training => training ? res.json(training) : res.status(400).json({ message: 'MSG' }))
        .catch(err => next(err));
}

function getTrainingById(req, res, next) {
    const currentTraining = req.training;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    //  if (id !== currentUser.sub && (currentUser.role !== Role.TL && currentUser.role !== Role.Admin )) {
    //      return res.status(401).json({ message: 'Unauthorized' });
    //   }

    trainingService.getTrainingById(req.params.id)
        .then(training => training ? res.json(training) : res.sendStatus(404))
        .catch(err => next(err));
}