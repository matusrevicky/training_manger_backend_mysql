const express = require('express');
const router = express.Router();

const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const db = require('_helpers/db');
// routes
router.get('/',authorize(),  getAllTrainings);
router.post('/bindwithuser/:id',authorize(), bindUserWithTraining);
//router.get('/:id',authorize([Role.Admin]),  getTrainingById);
//router.post('/',authorize([Role.Admin]),  createTraining);

module.exports = router;


function bindUserWithTraining(req,res,next){

    var idProvider = req.body.idProvider;
    var idCluster = req.body.idCluster;
    var idTraining = req.body.idTraining;
    var idCurrentUser = parseInt(req.params.id);
    var values = [[idCurrentUser, idTraining, idProvider, idCluster]];

    db.query('INSERT into user_has_training ( idUser, idTraining, idProvider, idCluster ) VALUES ?', [values], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })

    
    console.log(idProvider+' '+idCluster+' '+idTraining+' '+idCurrentUser);


}

function getAllTrainings(req, res, next) {
    db.query('SELECT t.idTraining, t.name, c.name as clustername, tp.Price as price, p.name as providername, tp.idProvider, tc.idCluster from trainings t join trainings_has_clusters tc on(t.idTraining = tc.idTraining) join clusters c on(c.idCluster = tc.idCluster) join trainings_has_providers tp on (t.idTraining = tp.idTraining) join providers p on (p.idProvider = tp.idProvider) ; ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })

}

/*
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
}*/