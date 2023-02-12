const express = require('express');
const notesRouter = require('./notes');

const router = express();

router.use('/notes',notesRouter);

module.exports = router;