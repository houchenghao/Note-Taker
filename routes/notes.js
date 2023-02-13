const express = require('express');
const path = require('path');
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);

const router = express();

router.use(express.json());

router.get('/',(req, res) => 
    readFromFile('./db/db.json','utf8').then((data) => {
        if(data !== null){
            res.json(JSON.parse(data))
        }else{
            res.sendFile(path.join(__dirname, '/public/notes.js'));
        }
    } 
));

router.post('/', (req, res) => {
    const {title,text} = req.body;

    if(title && text){
        const newFeedback = {
            title,
            text,
            id:uuidv4()
        }
    
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            } else {
            // Convert string into JSON object
            const parsedData = JSON.parse(data);
    
            // Add a new feedback
            parsedData.push(newFeedback);
    
            // Write updated data back to the file
            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedData, null, 4),
                (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated reviews!')
            );
            }
        });

        const response = {
            status: 'success',
            body: newFeedback,
        }

        console.log(response);
        res.status(201).json(response);
    }else{
        res.status(500).json('error in posting note')
    }
});

router.delete('/:id', (req, res) => {
    res.send('received delete request');
    //console.log(req.params.id);
    requestDeleteId = req.params.id.toLocaleLowerCase();
    
    readFromFile('./db/db.json','utf8')
        .then((data) => {
            parsedData = JSON.parse(data);
            // console.log(parsedData[0].id);
            // console.log(requestDeleteId);
            if(requestDeleteId){
                for(let i = 0; i < parsedData.length; i++){
                    if(requestDeleteId === parsedData[i].id.toLocaleLowerCase()){
                        parsedData.splice(i,1);
                        //console.log(parsedData);
                    }
                }
            };

            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedData, null, 4),
                (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated reviews!')
            );
        }); 

});


module.exports = router;