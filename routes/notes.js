const express = require('express');
const path = require('path');
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// create read file promise
const readFromFile = util.promisify(fs.readFile);

const router = express();

router.use(express.json());

//read file when receive 'api/' and get method if there is data transfer that to jason if not return note page
router.get('/',(req, res) => 
    readFromFile('./db/db.json','utf8').then((data) => {
        if(data !== null){
            res.json(JSON.parse(data))
        }else{
            res.sendFile(path.join(__dirname, '/public/notes.js'));
        }
    } 
));

// if receive post method with api/notes
router.post('/', (req, res) => {
    const {title,text} = req.body;

    // title and text from the request body not empty
    if(title && text){
        const newFeedback = {
            title,
            text,
            //issue a random id for every object in the request body
            id:uuidv4()
        }
        // read db json
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            } else {
            // Convert data to JSON object
            const parsedData = JSON.parse(data);
    
            // Add a new feedback to current data
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
        //creat a response 
        const response = {
            status: 'success',
            body: newFeedback,
        }

        //send response with status back to client
        res.status(201).json(response);
    }else{
        res.status(500).json('error in posting note')
    }
});

//if receive delete method with api/notes/${id}
router.delete('/:id', (req, res) => {
    res.send('received delete request');
    
    //get the id need to be deleted
    requestDeleteId = req.params.id.toLocaleLowerCase();
    
    //read file 
    readFromFile('./db/db.json','utf8')
        .then((data) => {
            parsedData = JSON.parse(data);
            if(requestDeleteId){
                for(let i = 0; i < parsedData.length; i++){
                    if(requestDeleteId === parsedData[i].id.toLocaleLowerCase()){
                        //delete the object with the request id from the data
                        parsedData.splice(i,1);
                    }
                }
            };

            //rewrite the file
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