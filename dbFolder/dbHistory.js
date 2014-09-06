/*
* Evan Preisler - dex4zero4zone4
* NUI Galway chat room
* twitter @dex4zero4zone4
* 2014
*/
exports.addHistory = function(email, ipAddr, atDate, req, res){
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host	: '', 	 
		user	: '', 
		password: '', 
		database: '',
	});
	console.log('Purpose that connects us....');
	var queryString = "INSERT INTO history VALUES('"+email+"', '"+ipAddr+"', '"+atDate+"');"; 
	connection.query(queryString);
};