const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongoDB')
    }
    catch(err){
        console.log('database connection error:', err)
    }
}

module.exports = connectDB