const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const moment = require( 'moment' );
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

let TicketSchema = new Schema({
    ticket_number: {
        type: String,
        default: shortid.generate
    },
    date_created: {
        type: Date,
        default: moment()
    },
    paid: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model( 'Tickets', TicketSchema );