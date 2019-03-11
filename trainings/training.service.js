const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
//const db = require('_helpers/db')();
//const app = require('../server');

// users hardcoded for simplicity, store in a db for production applications

global.trainings = [];

console.log(trainings); 

module.exports = {
    createTraining,
    getAllTrainings,
    getTrainingById

};

async function createTraining(trainingParam) {
    // validate
    //if (await User.findOne({ username: userParam.username })) {
    //    throw 'Username "' + userParam.username + '" is already taken';
    //}
 
    var training = {
        id: trainingParam.idTraining,  
        name: trainingParam.name,
    };

    console.log(training);

    // save user
    //await user.save();
    await trainings.push(training);
    return training;
}



async function getAllTrainings() {
    return trainings;
}


async function getTrainingById(id) {
    const training = trainings.find(u => u.id === parseInt(id));
    if (!training) return;
    return training;
}
