const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const db = require('_helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config.json');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize([Role.Admin, Role.TL]), getAll); // admin only
router.get('/:id', authorize(), getById);       // all authenticated users
router.post('/register', register);

module.exports = router;



function register(req, res, next) {
    var sql = "INSERT INTO users ( username, password, firstName, lastName, role) VALUES ?";
    var values = [[req.body.username, bcrypt.hashSync(req.body.password, 10), req.body.firstName, req.body.lastName, req.body.role]];
    console.log(values);
    db.query(sql, [values], function (err, result) {

        if (err) {res.err;  }
        else res.json(result);
    });
    //  userService.create(req.body)
    //     .then(user => user ? res.json(user) : res.status(400).json({ message: 'MSG' }))
    //     .catch(err => next(err));
}


// http://www.expertphp.in/article/user-login-and-registration-using-nodejs-and-mysql-with-example
async function authenticate(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
          return  res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            if (results.length > 0) {

                if (bcrypt.compareSync(password, results[0].password)) {
                    const token = jwt.sign({ sub: results[0].id, role: results[0].role }, config.secret);
                    const { password, ...userWithoutPassword } = results[0];
                    return res.json({
                        ...userWithoutPassword,
                        token
                    })

                } else {
                   return res.json({
                        status: false,
                        message: "name and password does not match"
                    });
                }

            }
            else {
              return  res.json({
                    status: false,
                    message: "name does not exits"
                });
            }
        }
    });
}


function getAll(req, res, next) {
    db.query('select * from users ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
    //  userService.getAll()
    //     .then(users => res.json(users))
    //    .catch(err => next(err));

}


function getById(req, res, next) {

    var id = parseInt(req.params.id);
    db.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
        if (!error)
            return res.send(results[0]);
        else
            console.log(error);
    })

    // const currentUser = req.user;
    // const id = parseInt(req.params.id);

    // only allow admins to access other user records
    //  if (id !== currentUser.sub && (currentUser.role !== Role.TL && currentUser.role !== Role.Admin )) {
    //      return res.status(401).json({ message: 'Unauthorized' });
    //   }

    //  userService.getById(req.params.id)
    //       .then(user => user ? res.json(user) : res.sendStatus(404))
    //      .catch(err => next(err));
}