//referencias html
const lblNuevoTicket= document.querySelector('#lblNuevoTicket');
const btnCrear= document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    btnCrear.disabled=false;
    
    socket.emit( 'ultimo-ticket', null, ( ultimo ) => {
        lblNuevoTicket.innerText = ultimo;
        // console.log('Desde el server', ticket );
    });
});

socket.on('disconnect', () => {
    btnCrear.disabled=true;
});



btnCrear.addEventListener( 'click', () => {
     socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
        // console.log('Desde el server', ticket );
    });    

});


