// HTML References
const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desk') ) {
    window.location = 'index.html';
    throw new Error('Desk is required');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('last-ticket', ( last ) => {
    // lblNewTicket.innerText = 'Ticket ' + last;
})

btnAttend.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});