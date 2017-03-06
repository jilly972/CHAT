var express= require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + "/public"));

http.listen(3000, function(){
  console.log('server is listenin on *:3000');
});

io.on('connection', function (socket) {
var loggedUser;
socket.on('user-login', function (loggedUser){
  console.log('user logged in :' + loggedUser.username)
  user= loggedUser;
})

  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconected');
  });


  socket.on('chat-message', function (message) {
    message.username = loggedUser.username;
    io.emit('chat-message', message);
    console.log('Message from :' + loggedUser.username);
  });
});
