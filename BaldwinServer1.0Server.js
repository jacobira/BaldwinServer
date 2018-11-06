//dependencies must be installed via npm first...
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

var port = 3333;
var users = [{username: 'jacob', password: 'password', active: false, name: 'Jacob'},
	{username: 'kira', password: 'password', active: false, name:'Kira Jo'},
	{username: 'development', password: 'password', active: false, name:'Developer'}];

// ideally, the above user information would be stored in an external database
// with which this backend would be communicating - Especially in cases where
// you are working with a very, very high number of users. In that instance,
// it would not be smart to store any of that info directly in the backend code.

io.on('connection', (socket) => {
	var socketUser = '';
	
	socket.on('login', (data) => {

		var username = data[0];
		var password = data[1];
		var auth = false;
		var authAcc = -1;

		for (let i = 0; i < users.length; i++) {
			if (username == users[i].username && password == users[i].password) {
				auth = true;
				authAcc = i;
			};
		};
		
		
		if (auth == true) {
			socket.emit('keycard', socketUser); 
			users[authAcc].active = true;
			// console.log("if statement is working");
			
			socketUser = `${users[authAcc].name}`;
			socket.emit('message-down', `Welcome to (c)BaldwinServer 1.0, ${socketUser}!`);
			
			// Events and listeners below
			socket.on('message-up', (data) => {
				console.log(data);
			});
			socket.on('file-pull', (data) => {
				console.log(`File pull initiated`);
				console.log(`File pull backend has not yet been built...Sorry!`);
			});
			socket.on('file-dump', (data) => {
				// syntax for writing files:
				// fs.writeFile(<filename.txt>, <filecontents>, <function(err)>)
				fs.writeFile(`${data[0]}`, `${data[1]}`, (err) => {
					if (err) {
						console.log('There was an error dumping the file');
					}
					else {
						console.log('File dump initiated...');
						socket.emit('message-down', 'File dump initiated on server...');
					}
				});
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
});

io.on('error', (err) => {
	console.log('The server has experienced the following error:');
	console.log(err);
});

io.on('end', () => {
	console.log('User disconnected');
});

// Port listener and confirmation.
server.listen(port);
console.log(`Server now running on localhost:${port}`);