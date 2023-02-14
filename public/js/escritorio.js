//referencias html
const lblEscritorio  = document.querySelector('h1');
const lblSmall       = document.querySelector('small');
const divAlerta      = document.querySelector('.alert');
const btnAtender     = document.querySelector('button');
const lblPendientes  = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio= searchParams.get('escritorio');
divAlerta.style.display='none';

lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled=false;    
});

socket.on('disconnect', () => {
    btnAtender.disabled=true;
});

socket.on( 'tickets-pendientes', ( pendientes ) => {
      lblPendientes.innerText = pendientes;
  });


  btnAtender.addEventListener( 'click', () => {
      socket.emit( 'atender-ticket', {escritorio}, ( payload ) => {
        const {ok,ticket}=payload;
        
        if(!ok){
            lblSmall.innerText ='Nadie';   
            return divAlerta.style.display='';
        }
        
        lblSmall.innerText = ticket.numero;        
        
     });    

});
