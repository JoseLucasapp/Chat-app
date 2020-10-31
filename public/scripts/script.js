let socket = io();

document.querySelector('#btnuser').addEventListener('click',(e)=>{
    e.preventDefault();
    name = document.querySelector('#username').value;
    //document.getElementById('divChat').style.zIndex = 99;
    document.getElementById('divChat').style.visibility = 'visible';
    document.getElementById('divUser').style.zIndex = -1;
    document.getElementById('divUser').style.visibility = 'hidden';
    if(name.length > 0){
        document.getElementById('sendbtn').disabled = false;
        document.getElementById('sendbtn').style.borderColor = 'blue';
        document.getElementById('sendbtn').style.color = 'blue';
    }
    else{
        document.getElementById('sendbtn').disabled = true;
        document.getElementById('sendbtn').style.borderColor = 'gray';
        document.getElementById('sendbtn').style.color = 'gray';
    }
});

document.querySelector('#formmsg').addEventListener('submit', (e) => {
    e.preventDefault();
    msg = document.querySelector('#message').value;
    name = document.querySelector('#username').value;
    let msgObject = {
        message: msg,
        name: name,
    };
    socket.emit('message', msgObject);
    document.getElementById('message').value = '';
    return false;
});

socket.on('message', (msgObject) => {
    renderMsg(msgObject);
});

socket.on('previous', (messages)=>{
    for(message of messages){
        renderMsg(message);
    }
});

socket.on('previoususers', (user)=>{
    renderUser(user);
});

socket.on('userOn',(users)=>{
    renderUser(users);
});


const renderMsg = (msgObject)=>{
    $('#msg').append($('<li><span>'+msgObject.name +'  </span>  ' + msgObject.message+'</li>'));
}
const renderUser = (user)=>{
    document.querySelector('#users').innerHTML = user + ' Online users';
}