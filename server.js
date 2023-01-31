require("dotenv").config();
const mongoose = require('mongoose');
const app = require('./app')
const oracledb = require('oracledb');

mongoose.connect(process.env.MONGODB_URL_LOCAL,{
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>console.log("DB connected successfully"))
.catch(()=>console.log("connection failed!"))

port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
  });

