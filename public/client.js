var socket = io();

$('form').submit(function(e) {
    e.preventDefault();
    var message = {
        text : $('#m').val()
    }
    socket.emit('chat-message', message);
    $('#m').val('');
    if (message.text.trim().length !== 0) { // Gestion message vide
      socket.emit('chat-message', message);
    }
    $('#chat input').focus();
});
socket.on('chat-message', function (message) {
  $('#messages').append($('<li>').html('<span class="username">' +message.username +'</span>' + message.text));
  
});
$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username : $('#login input').val().trim()
  };
  if (user.username.length > 0) {
    socket.emit('user-login', user);
    $('body').removeAttr('id');
    $('#chat input').focus();
  }
});
