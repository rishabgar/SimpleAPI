const mysql = require("mysql");
const con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"crud_operation",
	port:3306
});

con.connect((err) => {
	if(err){
		throw err;
	}
	else{
		console.log("Connection is successfull");
	}
});

module.exports.con = con;
