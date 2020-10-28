let socket = io();
document.querySelector('#username').addEventListener('blur', (e) => {
    document.querySelector('#username').readOnly = true;
    return false;
});
document.querySelector('#formmsg').addEventListener('submit', (e) => {
    e.preventDefault();
    msg = document.getElementById('message').value;
    name = document.getElementById('username').value;
    let msgObject = {
        message: msg,
        name: name,
    };
    socket.emit('message', msgObject);
    return false;
});
document.querySelector('#userbtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#userbtn').disabled = true;
    user = document.querySelector('#username').value;
    socket.emit('user', user);
    return false;
})
socket.on('message', (msgObject) => {
    renderMsg(msgObject);
});
socket.on('user', (user) => {
    renderUser(user);
});

socket.on('previous', (messages)=>{
    for(message of messages){
        renderMsg(message);
    }
});
socket.on('previoususers', (users)=>{
    for(user of users){
        renderUser(user)
    }
})

const renderMsg = (msgObject)=>{
    $('#msg').append($('<li><strong>'+msgObject.name +': </strong>' + msgObject.message+'</li>'));
}
const renderUser = (user)=>{
    $('#users').append($('<li>').text(user));
}