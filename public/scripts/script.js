let socket = io();
document.querySelector('#username').addEventListener('blur', (e) => {
    document.querySelector('#username').readOnly = true;
    return false;
});
document.querySelector('#formmsg').addEventListener('submit', (e) => {
    e.preventDefault();
    msg = document.getElementById('message').value;
    name = document.getElementById('username').value;
    socket.emit('message', msg, name);
    return false;
});
document.querySelector('#userbtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#userbtn').disabled = true;
    user = document.querySelector('#username').value;
    socket.emit('user', user);
    return false;
})
socket.on('message', (message, name) => {
    $('#msg').append($('<li>').text(name + ': ' + message));
});
socket.on('user', (user) => {
    $('#users').append($('<li>').text(user));
});