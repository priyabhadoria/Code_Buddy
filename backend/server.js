require('dotenv').config()
const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')

connectDB()

app.listen(3000,(err) =>{
    if(err){
        console.log("error", err)
    }
    console.log("server start on port 3000")
})
