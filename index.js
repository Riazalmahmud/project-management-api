
const app = require("./app")
require("dotenv").config()
require('./config/db')
const port = process.env.PORT || 4000

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
});

