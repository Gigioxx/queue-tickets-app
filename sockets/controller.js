const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'last-ticket', ticketControl.last );

    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.nextTicket();
        callback( next );

        // Pending: notify that is a new ticket pending to assign

    });

}

module.exports = {
    socketController
}