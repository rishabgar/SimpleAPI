const express = require("express");
const app = express();
const mysql = require("./connection").con
 app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res) => {
	res.render("index");
})

app.get("/add",(req,res) => {
	res.render("add");
})

app.get("/search",(req,res) => {
	res.render("search");
})

app.get("/update",(req,res) => {
	res.render("update");
})

app.get("/delete",(req,res) => {
	res.render("delete");
})

app.get("/view",(req,res) => {
	let qry = "select * from test";
	mysql.query(qry,(err,result) => {
		if(err){
			throw err;
		}
		else{
			res.render("view",{data:result});
		}
	})
})

app.get("/deletestudent",(req,res) => {
	const {phone} = req.query;
	let qry = "delete from test where phoneno=?";
	mysql.query(qry,[phone],(err,result) => {
		if(err){
			throw err;
		}
		else{
			if(result.affectedRows > 0 ){
				res.render("delete",{mssg:true});
			}
			else{
				res.render("delete",{checkmssg:true});
			}
		}
	})
})


app.get("/updatestudent",(req,res) => {
	const {name, phone,gender} = req.query;
	let qry = "update test set username=?,gender=? where phoneno=?";
	mysql.query(qry,[name,gender,phone],(err,result) => {
		if(err){
			throw err;
		}
		else{
			res.render("updatedata",{mssg:true});
		}
	})
})

app.get("/updatesearch",(req,res) => {
	const {phone} = req.query;
	let qry = "select * from test where phoneno=?";
	mysql.query(qry,[phone],(err,result) => {
		if(err){
			throw err;
		}
		else{
			if(result.length > 0){
				res.render("updatedata",{mssg:true,data:result});
			}
			else{
				res.render("update",{checkmssg:true});
			}
		}
	})
})
c

app.get("/addstudent",(req,res) => {
	const {name,phone,email,gender} = req.query;
	let qry = "select * from test where emailid=? or phoneno=?";
	mysql.query(qry,[email,phone],(err,result) => {
		if(err){
			throw err;
		}
		else{
			if(result.length > 0){
				res.render("add",{checkmssg:true});
			}else{
				
				let qry2 = "insert into test values(?,?,?,?)";
				mysql.query(qry2,[name,phone,email,gender],(err,results) => {
					if(results.affectedRows > 0){
						res.render("add",{mssg:true});
					}
				})
			}
		}
	})
})

app.listen(3000,(err) => {
	if(err){
		throw err;
	}
	else {
		console.log("Server is running on port 3000");
	}
})