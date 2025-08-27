const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.get('/:apikey', async (req, res)=>{

    // console.log(req.params.apikey);
    
    if(req.params.apikey=== 'UiV4Qr5Udbpr3Jm') {
        // res.send('Welcome to the Shelf Label API');
        const result = (await db.client.query('SELECT * FROM shelflabel',[])).rows[0];
        // console.log('Query result:', result);
        res.status(200);
        res.send(result);
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.post('/updateshelf/:apikey', async (req, res)=>{

    console.log(req);
    console.log(req.data.price);
    console.log(req.body.discount);
    console.log(req.body.shelf);
        
    if(req.params.apikey=== 'uZMeXQsUlruWM86') {
        var query = "update shelflabel set price="+req.body.price+", discount="+req.body.discount+"where shelf='"+req.body.shelf+"'";    
        const result = (await db.client.query(query,[]));
        res.status(200);
        res.send("Success");
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.post('/addshelf/:apikey', async (req, res)=>{

    console.log(req);
    console.log(req.data.price);
    console.log(req.body.discount);
    console.log(req.body.shelf);
        
    if(req.params.apikey=== 'uZMeXQsUlruWM86') {
        var query = "insert into shelflabel(shelf) values (req.body.shelf)'";    
        const result = (await db.client.query(query,[]));
        res.status(201);
        res.send("Success");
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);