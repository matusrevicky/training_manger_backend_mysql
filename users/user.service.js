const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


// users hardcoded for simplicity, store in a db for production applications
global.users = [];


//  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
// { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: 'User' }


console.log(users);

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
};


async function create(userParam) {
    // validate
    //if (await User.findOne({ username: userParam.username })) {
    //    throw 'Username "' + userParam.username + '" is already taken';
    //}

    var user = {
        //  id: userParam.id,  
        username: userParam.username,
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        //password: userParam.password,
        role: userParam.role
    };
    console.log(user);
    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    var sql = "INSERT INTO users ( username, password, firstName, lastName, role) VALUES ?";
    var values = [[user.username, user.password, user.firstName, user.lastName, user.role]];
    db.query(sql, [values], function (err, result) {

        if (err) throw err;
    });

    // save user 
    //await user.save();
    //  await users.push(user);
    return user;
}

var async = require('async');

//https://code.tutsplus.com/tutorials/managing-the-asynchronous-nature-of-nodejs--net-36183
async function authenticate({ username, password }) {
    mainFunction({ username, password }, function (err, user) {

        if (err) {
            console.log(err);
        } else {
            sideFunction({ username, password, user }, function (err, user) {
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                }
            });
        }


    });
}
function sideFunction({ username, password, user }, callback) {
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return callback({
            ...userWithoutPassword,
            token
        });
    }
}

function mainFunction({ username, password }, callback) {
    var sql = "select * from users where username = ?";
    var values = [[username]];

    db.query(sql, [values], (err, rows, fields) => {
        if (!err) {
            return callback(null, rows);
            //  const user = users.find(u => u.username === username);
        }
        else
            return callback(err, null);
        //console.log(err);
    });
}

/*
async function authenticate({ username, password }) {
    //  console.log(users);
    var sql = "select * from users where username = ?";
    var values = [[username]];

    db.query(sql, [values], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            var user = (rows);
            console.log(rows.password);
            if (err) {
                console.log(err);
            } else {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
                    const { password, ...userWithoutPassword } = userG;
                    return {
                        ...userWithoutPassword,
                        token
                    };
                }
            }
        }
    }); 
 }

//}
*/
async function getAll() {

    db.query("select * from users",(err, rows, fields) => {
        if (!err) {
            return rows;
            //  const user = users.find(u => u.username === username);
        }
        else
            return err;
        //console.log(err);
    });

  //  return users.map(u => {
   //     const { password, ...userWithoutPassword } = u;
  //      return userWithoutPassword;
 //   });
}



async function getById(id) {
    var sql = "select * from users where id = ?";
    var values = [[id]];

    db.query(sql, [values], (err, rows, fields) => {
        if (!err) {
            return rows;
            //  const user = users.find(u => u.username === username);
        }
        else
            return err;
        //console.log(err);
    });
   // const user = users.find(u => u.id === parseInt(id));
 //   if (!user) return;
  //  const { password, ...userWithoutPassword } = user;
  //  return userWithoutPassword;
} 
/*
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}*/