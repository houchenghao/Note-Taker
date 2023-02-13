const express = require('express');
const path = require('path');

const apiRouter = require('./routes/index.js');

const PORT = process.env.PORT || 3001;;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'))
});


app.get('*',(req,res) => {
    res.status(404).send('Not found, <a href="/">Go to homepage</a>')
});

app.listen(PORT, ()=> {
    console.log(`OK, ready to listen for requests sent to http://localhost:${PORT}`)
});