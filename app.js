/*
* Evan Preisler - dex4zero4zone4
* NUI Galway chat room
* twitter @dex4zero4zone4
* 2014
*/
var express = require('express');
var app = express();
var hbs = require('hbs');
var mysql = require('mysql');

var http = require('http');
var server = http.createServer(app);
var fs = require('fs');
var io = require('socket.io').listen(server);

var db = require('./dbFolder/dbAdd.js');
var userLI = require('./dbFolder/dbLogin.js');
var history = require('./dbFolder/dbHistory.js')

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.logger('dev'));

app.configure(function(){
	app.use(express.static(__dirname));
});

var userTable = [];
var numAddr = [];
var checkUser = [{id:null, ipAddr:null}];
var chatStr = {};

var connection = mysql.createConnection({
	host 	: '',
	user	: '',
	password: '',
	database: '',
});

function getAllUser(){
	console.log('It is purpose that defines us...');
	var queryString = "SELECT * FROM user;";
	connection.query(queryString, function(err, results, fields){
		if(err) throw err;
		for(var i=0; i<results.length; i++){
			userTable.push(results[i]);
		}
	});
}

io.sockets.on('connection', function(socket) {
   	socket.emit('welcome', { message: 'Welcome ^_^' });
   	socket.on('rightBack', console.log);
	socket.on('sendMessage', function(data){
		var num=0;
		for(var i=0; i<userTable.length; i++){
			if(data.email==userTable[i].email){
				num=i;
				break;
			}
		}
		chatStr.message =data.message;
		chatStr.name = userTable[num].name;
		io.sockets.emit('messageChat', {chat:chatStr});
	});
	socket.on('userOnline', function(data){
		var num=0;
		var onlineUsers = [];
		for(var i=0; i<userTable.length; i++){
			if(data.userEmail==userTable[i].email){
				num=i;
				break;
			}
		}
		for(var i=1; i<checkUser.length; i++){
			if(num!=checkUser[i].id){
				var check = checkUser[i].id;
				onlineUsers.push(userTable[check]);
			};
		}
		socket.emit('checkOnline', {onlineTable: onlineUsers});
	});	
});

getAllUser();

app.get('/', function(req, res){
	res.render('index', {title:"Welcome"});
});

app.post('/loginOK', express.bodyParser(), function(req, res){
	var num = userLI.userLogin(req.body.email, req.body.pwd, userTable);
	var addr = req.connection.remoteAddress;
	var date = new Date();
	for(var i=1; i<checkUser.length; i++){
		if(num==checkUser[i].id){
			num=null;
		}
	}
	if(num!=null){
		numAddr = {id:num, sessionID:req.session.id};
		checkUser.push(numAddr);
		console.log(checkUser);
		history.addHistory(userTable[num].email, addr, date);
		console.log(userTable[num].email);
		res.render('homePage', {title:"Home Page", dog:userTable[num]});
	}else{
		res.render('loginFail', {title:"Login Failed"});
	}
});

app.get('/homePage', function(req, res){
	var num = 0;
	for(var i=1; i<checkUser.length; i++){
		if(checkUser[i].sessionID==req.session.id){
			num=checkUser[i].id;
			break;
		}
	}
	res.render('homePage', {title:"Home Page", dog:userTable[num]});
});

app.get('/newHomePage', function(req, res){
	var num = userTable.length-1;
	var addr = req.connection.remoteAddress;
	var date = new Date();
	numAddr = {id:num, sessionID:req.session.id};
	checkUser.push(numAddr);
	history.addHistory(userTable[num].email, addr, date);
	console.log(userTable[num].email);
	res.render('homePage', {title:"Home Page", dog:userTable[num]});
});

app.get('/logOut', function(req, res){
	var num = 0;
	for(var i=1; i<checkUser.length; i++){
		if(checkUser[i].sessionID==req.session.id){
			num=i;
			break;
		}
	}
	console.log(checkUser);
	checkUser.splice(num, 1);
	console.log(checkUser);
	res.render('index', {title:"Welcome"});
});

app.get('/chatRoom', function(req, res){
	var num = 0;
	for(var i=1; i<checkUser.length; i++){
		if(checkUser[i].sessionID==req.session.id){
			num=checkUser[i].id;
			break;
		}
	}
	res.render('chatRoom', {title:"The Chat Room", test:userTable[num]});
});

app.get('/dbAdd', function(req, res){
	res.render('form', {title:"Add to Database"});
});

app.get('/show', function(req, res){
	res.render('show', {title:"Users in Database", cat:userTable});
});

app.post('/register', express.bodyParser(), function(req, res) {
	db.addDetail(req.body.name, req.body.surname, req.body.email, req.body.gender, req.body.DOB, req.body.firAddr, req.body.secAddr, req.body.city, req.body.country, req.body.pwd);
	var tempAdd = {name:req.body.name, surname:req.body.surname, email:req.body.email, gender:req.body.gender, DOB:req.body.DOB, firLineAddr:req.body.firAddr, secLineAddr:req.body.secAddr, city:req.body.city, country:req.body.country, password:req.body.pwd};
	console.log(tempAdd);
	userTable.push(tempAdd);
	res.render('dbAdd', {title:"You have been added"});
});

server.listen();
console.log("listing on port ");