const express = require('express');
var cors = require('cors')
const db = require('./db');
// const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:3003/',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3003");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/getall/:apikey', async (req, res)=>{

    console.log(req.params.apikey);
    
    if(req.params.apikey=== 'UiV4Qr5Udbpr3Jm') {
        // res.send('Welcome to the Shelf Label API');
        const result = ((await db.client.query('SELECT * FROM shelflabel',[])).rows);
        // console.log('Query result:', result);
        res.status(200);
        res.send(result);
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.get('/:apikey/:shelflbl', async (req, res)=>{

    console.log(req.params);
    const selquery = 'SELECT * FROM shelflabel where shelf = \''+req.params.shelflbl+'\''

    console.log(selquery)
    
    if(req.params.apikey=== 'UiV4Qr5Udbpr3Jm') {
        // res.send('Welcome to the Shelf Label API');
        const result = ((await db.client.query(selquery,[])).rows[0]);
        // console.log('Query result:', result);
        res.status(200);
        res.send(result);
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.post('/updateshelf/:apikey', async (req, res)=>{

    console.log(req.body.price);
    console.log(req.body.discount);
    console.log(req.body.shelf);
    console.log(req.body.product);
        
    if(req.params.apikey=== 'uZMeXQsUlruWM86') {
        var query = "update shelflabel set price="+req.body.price+", discount="+req.body.discount+", product='"+req.body.product+"\' where shelf='"+req.body.shelf+"'";    
        console.log(query);
        const result = (await db.client.query(query,[]));
        res.status(200);
        res.send("Success");
    }else {
        res.status(403);
        res.send('Forbidden: Not Authorized');
    }
});

app.post('/addshelf/:apikey', async (req, res)=>{

    console.log(req.body.shelf);
        
    if(req.params.apikey=== 'uZMeXQsUlruWM86') {
        var query = "insert into shelflabel(shelf,price,discount,product) values (req.body.shelf,req.body.price,req.body.discount,req.body.product)";
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