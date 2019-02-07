# Parkade

## Docs

###### /api/payments/:ticketId
send
```
{
  credit_card_number: '4242 4242 4242 4242',
  amount_owing: '5.32'
}
```

on successful return
```
{
    "ticket": {
        "date_created": "2019-02-07T21:04:30.748Z",
        "paid": true,
        "_id": "5c5c9d62155e2321f7e2887f",
        "ticket_number": "zmvtxGZhE",
        "__v": 0
    },
    "status": 200,
    "message": "Credit card 4242 4242 4242 4242 was charged $5.32. Thank you for parking with us today."
}
```
