var mysql = require('mysql');
const {password} = require('./config.js')

var dbConnection = mysql.createConnection({
  user:'root',
  password:password,
  database:'airbnb2'
});

dbConnection.connect(err =>{
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('mysql database connected to airbb2');
  }
})

module.exports.dbConnection= dbConnection