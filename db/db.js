const mongoose  = require('mongoose');
mongoose.connect("mongodb://localhost/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));
  
  require('../models/todoSchema');
  require('../models/userSchema');
  
  