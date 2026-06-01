const express = require("express")
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.routes')  

const app = express()

const cors = require('cors');
// App initialization ke baad aur routes se PEHLE ise likhein:
app.use(cors({
    origin: "http://localhost:5173", // Apne frontend ka URL yahan likhein
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Yeh line zaroori hai kyunki frontend par withCredentials: true hai
}));
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth' , userRoutes)







module.exports = app;


