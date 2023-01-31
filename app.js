const express  = require('express');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());//It parses incoming requests with JSON payloads and is based on body-parser.

app.use('/api/user',userRouter);

module.exports = app;