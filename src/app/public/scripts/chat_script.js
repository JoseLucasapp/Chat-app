let socket = io();
let date = new Date()
let hour = date.getHours(); 
let min = date.getMinutes();
let total = ' '+hour + ':' + min;

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

const unlockBtn = ()=>{
    name = document.querySelector('#username').value;
    if(name.length > 1){
        document.getElementById('btnuser').disabled = false;
        document.getElementById('sendbtn').disabled = false;
        document.getElementById('btnuser').style.borderColor = 'green';
        document.getElementById('btnuser').style.color = 'green';
        document.querySelector('#username').style.borderBottom = '1px solid green';
        document.querySelector('#username').style.color = 'green';
    }
    else{
        document.getElementById('btnuser').disabled = true;
        document.getElementById('btnuser').style.borderColor = 'gray';
        document.getElementById('btnuser').style.color = 'gray';
        document.querySelector('#username').style.borderBottom = '1px solid purple';
    }
};

document.querySelector('#btnuser').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('divChat').style.visibility = 'visible';
    document.getElementById('online').style.visibility = 'visible';
    document.getElementById('divUser').style.zIndex = -1;
    document.getElementById('divUser').style.visibility = 'hidden';
});

document.querySelector('#formmsg').addEventListener('submit', (e) => {
    e.preventDefault();
    msg = document.querySelector('#message').value;
    name = document.querySelector('#username').value;
    let msgObject = {
        message: msg,
        name: name,
        date: total
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
    $('#msg').append($('<li><span class="name">'+msgObject.name +'  </span>  '+'<span class="msgtext">' + msgObject.message +'</span> '+'<span class="time">'+msgObject.date+'</span>'+'</li>'));
    document.querySelector('#campo_msg').scrollTo(0, 9999999999999999);
}
const renderUser = (user)=>{
    document.querySelector('#users').innerHTML = user + ' Online users';
}