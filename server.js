const express = require('express');
const path = require('path');

const apiRouter = require('./routes/index.js');

//heroku port define
const PORT = process.env.PORT || 3001;;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//with api route to apiRouter (index.js)
app.use('/api', apiRouter);

//home page direction
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'))
});

//click button will return /notes, this direct to notes.html
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/notes.html'))
});

//white card to go back home
app.get('*',(req,res) => {
    res.status(404).send('Not found, <a href="/">Go to homepage</a>')
});

//port listen
app.listen(PORT, ()=> {
    console.log(`OK, ready to listen for requests sent to http://localhost:${PORT}`)
});