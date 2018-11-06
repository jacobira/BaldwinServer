const io = require('socket.io-client');
const client = io.connect('http://localhost:3333');

var usernameEntry = "jacob";
var passwordEntry = "password";

client.emit("login", [`${usernameEntry}`, `${passwordEntry}`]);

client.on("keycard", (data) => {
    // allows access to full front-end and backend functions.
    auth = true;

    var username = usernameEntry;

    function filePull() {
        client.emit("file-pull", request);
    };
    function fileDump(filename, contents) {
        client.emit("file-dump", [filename, contents]);
    }
    
    client.emit("message-up", `Hello, server! Username ${username} now active.`);
    client.on("message-down", (data) => {
        console.log(data);
    });

    fileDump("test.txt", "Testing, testing. From client " + `username ${username}`);
    
});
