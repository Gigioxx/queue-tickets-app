const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('send-message', ( payload, callback ) => {

        const id = 123456789;
        callback( id );
        
        socket.broadcast.emit('send-message', payload );

    });

}

module.exports = {
    socketController
}