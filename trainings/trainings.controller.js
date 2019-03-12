const express = require('express');
const router = express.Router();

const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const db = require('_helpers/db');
// routes
router.get('/', authorize(), getAllTrainings);
router.get('/:id', getMyTrainings);
router.get('/employeeTrainings/:id/:gen', getEmployeeTrainings);
router.post('/bindwithuser/:id', authorize(), bindUserWithTraining);
//router.get('/:id',authorize([Role.Admin]),  getTrainingById);
//router.post('/',authorize([Role.Admin]),  createTraining);

module.exports = router;


function bindUserWithTraining(req, res, next) {

    var idProvider = req.body.idProvider;
    var idCluster = req.body.idCluster;
    var idTraining = req.body.idTraining;
    var idCurrentUser = parseInt(req.params.id);
    var values = [[idCurrentUser, idTraining, idProvider, idCluster, "pending approval"]];

    db.query('INSERT into user_has_training ( idUser, idTraining, idProvider, idCluster, trainingStatus ) VALUES ?', [values], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })


    console.log(idProvider + ' ' + idCluster + ' ' + idTraining + ' ' + idCurrentUser);


}

function getAllTrainings(req, res, next) {
    db.query('SELECT t.idTraining, t.name, c.name as clustername, tp.Price as price, p.name as providername, tp.idProvider, tc.idCluster from trainings t join trainings_has_clusters tc on(t.idTraining = tc.idTraining) join clusters c on(c.idCluster = tc.idCluster) join trainings_has_providers tp on (t.idTraining = tp.idTraining) join providers p on (p.idProvider = tp.idProvider) ; ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })

}

// returns list of my trainings (current user id)
function getMyTrainings(req, res, next) {
    var idCurrentUser = parseInt(req.params.id);
    db.query('select t.name training, u.idUser, u.firstName, u.lastName, p.name provider, c.name cluster, ut.trainingStatus as status, tp.price  from user_has_training ut join providers p on(ut.idProvider = p.idProvider) join clusters c on (c.idCluster = ut.idCluster ) join trainings t on (t.idTraining = ut.idTraining) join users u on (ut.idUser = u.idUser) join trainings_has_providers tp on (tp.idProvider = ut.idProvider and tp.idTraining = ut.idTraining ) where u.idUser = ?;    ', idCurrentUser, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })

}


// returns list of my trainings (current user id)
function getEmployeeTrainings(req, res, next) {
    var idCurrentUser = parseInt(req.params.id);
    var gen = parseInt(req.params.gen);;
    var sql = "WITH RECURSIVE PotomokPredok(potomokId, predokId, generacia) AS(SELECT Dieta.idUser, Rodic.idUser, 1 FROM Users AS Dieta JOIN Users AS Rodic ON Rodic.idUser IN(Dieta.idBoss) UNION ALL SELECT Dieta.idUser, Predok.predokId, generacia + 1 FROM PotomokPredok AS Predok JOIN Users AS Dieta ON Predok.potomokId IN(Dieta.idBoss)) select pp.potomokId idUser, u.username nameUser, u2.username nameBoss, ut.idTraining, ut.trainingStatus, t.name nameTraining from PotomokPredok pp join users u on(u.idUser = pp.potomokId) join users u2 on(u2.idUser = pp.predokId) join user_has_training ut on(pp.potomokId = ut.idUser) join trainings t on(t.idTraining = ut.idTraining) where pp.generacia = ? and pp.predokId = ? order by pp.potomokid;    "
    
    db.query(sql, [gen, idCurrentUser], (err, rows, fields) => {
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