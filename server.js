const express = require ('express');
const db= require ('./db/db');
const bcrypt = require('bcrypt');
// const cron = require('node-cron');
const todoController = require ('./routes/todoApi');
const bodyParser = require('body-parser');
const routes = require('./routes/userApi');
const routerMail = require('./routes/mailApi');
const uploadPicture = require('./routes/picture')
const mongo = require('mongodb').MongoClient;

const passport = require('passport')
// const bearerStrategy = require ('./passport');
require('./passport');
const app = express();



app.use(passport.initialize());

 
// cron.schedule('*/2 * * * *', () => {
//   console.log('running a task every two minutes');
// });
 
app.use(bodyParser.json());
app.use("/",routerMail);
app.use("/",routes);
app.use("/",uploadPicture );
todoController(app);

// passport.use(bearerStrategy);

   



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });
  