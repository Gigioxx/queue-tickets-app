const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'last-ticket', ticketControl.last );

    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.nextTicket();
        callback( next );

        // Pending: notify that is a new ticket pending to assign

    });

    socket.on('attend-ticket', ( { desk }, callback ) => {
        if ( !desk ) {
            return callback({
                ok: false,
                msg: 'Desk is required'
            });
        }

        const ticket = ticketControl.attendTicket( desk );

        // Pending: Notify change in last 4 tickets

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