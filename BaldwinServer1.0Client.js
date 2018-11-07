const io = require('socket.io-client');
const client = io.connect('http://localhost:3333');
const fs = require('fs');

var usernameEntry = "jacob";
var passwordEntry = "password";

client.emit("login", [`${usernameEntry}`, `${passwordEntry}`]);

client.on("keycard", (data) => {

    var username = usernameEntry;

    // values will be assigned based on FRONT END interaction.
    var _fileData;
    var _filePath;
    // name of the file as established on the FRONT END.
    var _fileName;

    // file path needs to be exact every time...
    // need to be able to select on both server side and client side
    // whatever file(s) are going to be transferred in either direction.
    // This will need to happen on the FRONT END.
    function getLocalFileData(filePath){
        _fileData = fs.readFile(filePath, function(err, data){
            return data;
        });
        _filePath = filePath;
    }

    //FILE TRANSFER METHODS
    function filePull(filename) {
        client.emit("file-pull", filename);
    };
    function fileDump(filename, data) {
        client.emit("file-dump", [filename, data]);
    };

    // example/test run of file transfer
    // fileDump(_fileName, _fileData);
    
    
    client.emit("message-up", `Username ${username} logged in.`);
    client.on("message-down", (data) => {
        console.log(data);
    });
});
