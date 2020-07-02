var mysql = require('mysql');
const {password} = require('./config.js')

var dbConnection = mysql.createConnection({
  user:'root',
  password:password,
  database:'airbnb'
});

dbConnection.connect(err =>{
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('mysql database connected');
  }
})

module.exports.dbConnection= dbConnection