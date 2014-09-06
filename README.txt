You will need node.js on your computer.

You will need to make the chat room work:
1: express
2: hbs
3: mysql
4: socket.io

To install any of the about, just go to the root folder in command prompt where you'll
have the project saved and type for example: npm install express

Also some detail will need to be enter for this to work.

app.js: You'll need to enter your own mysql details on line 38-41.
	port number on line 179: server.listen(/*port number*/);

In the dbFolder:
dbHistory.js: You'll need to enter your own mysql details on line 11-14.

dbAdd.js: You'll need to enter your own mysql details on line 11-14.

In the views folder:
chatRoom.html 	on line 10: <script src='http://<!--your web address-->:<--port number-->//socket.io/lib/socket.io.js'></script>
		on line 29: var socket = io.connect('//<!--your web address-->:<!--port number-->');

for example: var socket = io.connect('//www.example.com:8000');

form.html	on line 9: <form name="input" action="http://<!--your web address-->:<--port number-->/register" method="post">

homePage.html	on line 10: <script src='http://<!--your web address-->:<!--port number-->/socket.io/lib/socket.io.js'></script>
		on line 21: var socket = io.connect('//<!--your web address-->:<!--port number-->');

index.html	on line 10: <form name="input" action="<!--your web address-->:<!--port number-->/loginOK" method="post">


The tables that you will need to be created in your mysql for the chat room to work.

User Table:
CREATE TABLE users (name VARCHAR(15), surname VARCHAR(20), email VARCHAR(100), gender VARCHAR(6), DOB date, firLineAddr VARCHAR(30), secLineAddr VARCHAR(30), city VARCHAR(30), country VARCHAR(30), password TEXT, 
CONSTRAINT a1 PRIMARY KEY (email));

History Table:
CREATE TABLE history(emailFrom VARCHAR(100), locationFrom VARCHAR(100), ipAddrFrom VARCHAR(25) emailTo VARCHAR(100), locatioNTo VARCHAR(100), ipAddrTo VARCHAR (25), atDate VARCHAR(60), 
CONSTRAINT a2 PRIMARY KEY (emailFrom, emailTo),
CONSTRAINT a3 FOREIGN KEY (emailFrom) REFERENCES user(email),
CONSTRAINT a4 FOREIGN KEY (emailTo) REFERENCES user(email));
