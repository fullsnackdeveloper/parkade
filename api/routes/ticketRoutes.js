module.exports = function(app) {
    let tickets = require( '../controllers/ticketController' );

    app.route( '/api/tickets' )
        .get( tickets.get_tickets )
        .post( tickets.create_ticket );

    app.route( '/api/tickets/:ticketId')
        .get( tickets.read_ticket )

    app.route( '/api/payments/:ticketId')
        .post( tickets.pay_ticket );
}