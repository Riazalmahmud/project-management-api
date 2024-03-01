require("dotenv").config()

const database ={
    port :{
        url: process.env.PORT || 4000
    },
    db:{
dbURL: process.env.DB_URL || 'mongodb://localhost:27017'
    }
}

module.exports = database