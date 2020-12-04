document.querySelector('#username').addEventListener('blur',()=>{
    name = document.querySelector('#username').value;
    if(name.length > 0){
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
});

document.querySelector('#btnuser').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('divChat').style.visibility = 'visible';
    document.getElementById('online').style.visibility = 'visible';
    document.getElementById('divUser').style.zIndex = -1;
    document.getElementById('divUser').style.visibility = 'hidden';
});