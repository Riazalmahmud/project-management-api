
const express = require('express')
const cors = require('cors')
const userRoute = require("./routes/user.route")
const tamRoute = require("./routes/team.route")
const taskRoute = require("./routes/task.route")
const projectRoute = require("./routes/project.route")
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/v1/user", userRoute)
app.use("/api/v1/team", tamRoute)
app.use("/api/v1/task", taskRoute)
app.use("/api/v1/project", projectRoute)





// require('crypto').randomBytes(64, function(err, buffer) {
//     var token = buffer.toString('hex');
//     console.log(token)
//   });

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/models/index.html")
})

app.use((req, res, next)=>{
    res.status(404).json({message: "route not found ", status: 404})
    })
    // server when not connect then will show 
app.use((err, req, res, next)=>{
    res.status(500).json({message: err.message, status: 500})
    })
module.exports = app
