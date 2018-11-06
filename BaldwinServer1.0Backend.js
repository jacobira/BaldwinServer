//dependencies must be installed via npm first...
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var port = 3333;
var users = [{name: 'jacob', password: 'password', active: false},
	{name: 'kira', password: 'password', active: false},
	{name: 'development', password: 'password', active: false}];

//ideally, the above user information would be stored in an external database
//with which this backend would be communicating - Especially in cases where
//you are working with a very, very high number of users. In that instance,
//it would not be smart to store any of that info directly in the backend code.

io.on('connection', (socket) => {
	var socketUser = '';
	
	for (let i = 0; i < users.length; i++){
		//need to build front end code so that it passes the below listed parameters.
		socket.on('login', (name, password)=> {
			
			//set so development does not need login
			name = 'development';
			password = 'password';
			//
			
			if ((name = users[i].name) && (password = users[i].password)) {
				users[i].active = true;
				socketUser = `${users[i].name}`;
				socket.emit('keycard'); 
				//Front end needs to accept this above event as approval
				//from the backend and allow access to backend functions.
				socket.emit('message', `Welcome to BaldwinServer 1.0, ${users[i].name}!`);
				
				//Events and listeners below
				socket.on('file-pull', (data) => {
					console.log(`File pull initiated`);
					console.log(`File pull backend has not yet been built...Sorry!`);
				});
				socket.on('file-dump', (data) => {
					console.log(`File dump initiated`);
					console.log(`File dump backend has not yet been built...Sorry!`);
				});
				socket.on('new-sched-item', (data) => {
					console.log(`New schedule item initiated`);
					console.log(`New schedule item backend has not yet been built...Sorry!`);
				});
			 }
			 else {
			 	socket.emit('message', `Incorrect login information.`);
			 	console.log(`Failed login attempt.`);
			 };
			
		});
	};
});

io.on('error', (err) => {
	console.log('The server has experienced the following error:');
	console.log(err);
});

server.listen(port);
console.log(`Server now running on localhost:${port}`);