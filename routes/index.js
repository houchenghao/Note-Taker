const express = require('express');
const notesRouter = require('./notes');

const router = express();

//if /notess route to notesRouter (notes.js)
router.use('/notes',notesRouter);

module.exports = router;