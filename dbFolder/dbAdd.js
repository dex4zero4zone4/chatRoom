/*
* Evan Preisler - dex4zero4zone4
* NUI Galway chat room
* twitter @dex4zero4zone4
* 2014
*/
exports.addDetail = function(name, surname, email, gender, DOB, firAddr, secAddr, city, country, password, req, res){
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host	: '', 	 
		user	: '', 
		password: '', 
		database: '',
	});
	console.log('It is purpose that created us...');
	var queryString = "INSERT INTO user VALUES('"+name+"', '"+surname+"', '"+email+"', '"+gender+"', '"+DOB+"', '"+firAddr+"', '"+secAddr+"', '"+city+"', '"+country+"', '"+password+"');"; 
	connection.query(queryString);
};