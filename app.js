const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.get('/', async (req, res)=>{
    res.status(200);
    // const result = await db.query('SELECT * FROM shelflabel');
    // res.json(result.rows);
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);