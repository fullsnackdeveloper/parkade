const mongoose = require( 'mongoose' );
const Ticket = mongoose.model( 'Tickets' );
const moment = require( 'moment' );

exports.get_tickets = function(req, res) {
    Ticket.find({paid: false}, function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

exports.create_ticket = function(req, res) {
    Ticket.find({paid: false}, function(err, tickets) {
        if (err)
            res.send(err);
        if (tickets.length < 16) {
            let new_ticket = new Ticket( req.body );
            new_ticket.save(function(err, ticket) {
                if (err)
                    res.send(err);
                res.json(ticket);
            });            
        } else {
            res.status(400).send({ error: 'Parkade is full.' });
        }
    });
};

exports.read_ticket = function(req, res) {
    Ticket.findOne({ ticket_number: req.params.ticketId }, function(err, ticket) {
        if (err)
            res.send(err);
        if (ticket.paid)
        res.status(400).send({ error: 'Ticket is paid and invalid for reuse.' });
        let currentDate = moment();
        let dateCreated = moment( ticket._id.getTimestamp() );
        let hoursInParkade = moment.duration(currentDate.diff(dateCreated)).as('hours');
        let amountOwing;
        if (hoursInParkade <= 1)
            amountOwing = hoursInParkade * 3
        if ((hoursInParkade > 1) && (hoursInParkade <= 3))
            amountOwing = hoursInParkade * 1.5
        if ((hoursInParkade > 3) && (hoursInParkade <= 6))
            amountOwing = hoursInParkade * 0.75
        if (hoursInParkade > 6)
            amountOwing = hoursInParkade * 0.37
        res.json({
            ticket_number: req.params.ticketId,
            amount_owing: amountOwing.toFixed(2) 
        });
    });
};

exports.pay_ticket = function(req, res) {
    Ticket.findOne({ ticket_number: req.params.ticketId }, function(err, ticket) {
        let errors = [];
        const { credit_card_number, amount_owing } = req.body;
        if (err) {
            res.send(err);
        } else if (ticket.paid) {
            res.status(400).send({ error: 'Ticket is paid and invalid for reuse.' });
        } else if (!credit_card_number) {
            res.status(400).send({ error: 'Please enter a valid credit card number.' });            
        } else if (!amount_owing) {
            res.status(400).send({ error: 'Please enter amount owing.' });
        } else {
            // payment process here
            let paymentSuccessful = true;

            // on failed payment
            if (paymentSuccessful) {
                // on successful payment
                ticket.paid = true;
                ticket.save((err) => {
                    if (err)
                        res.send(err);
                    res.json({
                        ticket,
                        status: 200,
                        message: `Credit card ${credit_card_number} was charged $${amount_owing}. Thank you for parking with us today.`
                    })
                });  
            } else {
                res.status(400).send({ error: 'Payment has failed. Please try again.' })
            }
        }
    });
};