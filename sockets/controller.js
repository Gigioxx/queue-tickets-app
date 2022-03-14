const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'actual-state', ticketControl.last4 );
    socket.emit( 'pending-tickets', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.nextTicket();
        callback( next );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

    });

    socket.on('attend-ticket', ( { desk }, callback ) => {
        if ( !desk ) {
            return callback({
                ok: false,
                msg: 'Desk is required'
            });
        }

        const ticket = ticketControl.attendTicket( desk );

        socket.broadcast.emit( 'actual-state', ticketControl.last4 );
        socket.emit( 'pending-tickets', ticketControl.tickets.length );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'No pending tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}