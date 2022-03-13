// HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreateTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCreateTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnCreateTicket.disabled = true;
});

socket.on('last-ticket', ( last ) => {
    lblNewTicket.innerText = 'Ticket ' + last;
})

btnCreateTicket.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});