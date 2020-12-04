let socket = io();

document.querySelector('#message').addEventListener('change',()=>{
    message = document.querySelector('#message').value;
    if(message.length > 0 && message.length < 51){
        document.querySelector('#sendbtn').disabled = false;
    }
    else{
        block();
    }
})
const block = ()=>{
    document.querySelector('#sendbtn').disabled = true;
}

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
    block();
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
    document.querySelector('#campo_msg').scrollTo(0, 9999999999999999);
}
const renderUser = (user)=>{
    document.querySelector('#users').innerHTML = user + ' Online users';
}