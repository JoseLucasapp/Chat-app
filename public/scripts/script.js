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
    socket.emit('disconnect', user);
    return false;
});
socket.on('message', (msgObject) => {
    renderMsg(msgObject);
});

socket.on('previoususersname', (usernames)=>{
    for(user of usernames){
        renderUserName(user);
    }
});

socket.on('usersnames',(username)=>{
    renderUserName(username);
});

socket.on('previous', (messages)=>{
    for(message of messages){
        renderMsg(message);
    }
});

socket.on('previoususers', (user)=>{
    renderUser(user)
});

socket.on('userOn',(users)=>{
    renderUser(users);
});

const renderMsg = (msgObject)=>{
    $('#msg').append($('<li><strong>'+msgObject.name +': </strong>' + msgObject.message+'</li>'));
}
const renderUser = (user)=>{
    document.getElementById('users').innerHTML = user + ' Online users';
    //$('#users').append($('<li><p>'+user+'</p></li>'));
}
const renderUserName = (user) => {
    //document.querySelector('#online_users').innerHTML = '<li>'+ user +'</li>';
    $('#online_users').append($('<li>'+ user +'</li>'));
}