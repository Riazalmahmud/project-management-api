const mongoose = require('mongoose');
const config = require('./config');
const dburl= config.db.dbURL
console.log(dburl);
mongoose.connect(dburl).then(()=> console.log('successfully connected to MongoDB')).catch((error)=> console.log(error))