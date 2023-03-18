const express = require('express');
const mongoose = require('mongoose');
// const EmailGenRouter = require('./router/EmailGenRouter')
const EmainGenRouter = require('./router/EmailGenRouter')
const bodyParser = require('body-parser');
const app = express();

const dbUrl = 'mongodb://localhost:27017/emailsystemdb';

mongoose.set('debug', false);
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection

db.on('error', (error)=>{
    console.error(error);
})

db.on('open', ()=>{
    console.log('Database connected successfully!!!...');
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(8000, ()=>{
    console.log("Server is running on port 8000 !!!");
})
app.use('/api/temp-mail', EmainGenRouter);
