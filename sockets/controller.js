const TicketControl = require("../models/ticket-control");

const ticketControl= new TicketControl;

const socketController = (socket) => {
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('ultimo-ticket', ( payload, callback ) => {
        const ultimo= ticketControl.ultimo;
        callback(ultimo);        
       })
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente= ticketControl.siguiente();
        callback(siguiente);        
        //TODO NOTIFICAR que hay un nuevo ticket pendiente      

    })   

}



module.exports = {
    socketController
}

