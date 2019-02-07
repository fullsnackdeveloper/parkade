# Parkade

## Docs

###### /api/tickets
get
```
[
    {
        "date_created": "2019-02-07T21:16:40.269Z",
        "paid": false,
        "_id": "5c5ca0cb40ec7a229610b451",
        "ticket_number": "8vewYcCqg",
        "__v": 0
    },
    {
        "date_created": "2019-02-07T21:20:12.281Z",
        "paid": false,
        "_id": "5c5ca115942bf522c66bab98",
        "ticket_number": "1t09vJyqa",
        "__v": 0
    },
    
...
````

post

returns
```
{
    "date_created": "2019-02-07T22:03:46.443Z",
    "paid": false,
    "_id": "5c5cad03fb2a3c26eeca1eee",
    "ticket_number": "71Be4tu4H",
    "__v": 0
}
```


###### /api/payments/:ticketId
post

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
