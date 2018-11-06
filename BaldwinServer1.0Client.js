const io = require('socket.io-client');
const client = io.connect('http://localhost:3333');

var auth = false;
var usernameEntry = "development";
var passwordEntry = "password";

client.emit("login", (usernameEntry, passwordEntry));
client.on("keycard", (username) => {
    // allows access to full front-end and backend functions.
    auth = true;
});

if (auth = true) {

    var username = usernameEntry;

    function filePull() {
        client.emit("file-pull", request);
    };
    
    client.emit("message-up", `Hello, server! This is ${username}; testing.`);
};
