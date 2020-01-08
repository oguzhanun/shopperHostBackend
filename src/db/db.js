const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"hbstudent",
    password:"hbstudent",
    database:"shopperHost"
})

module.exports = db