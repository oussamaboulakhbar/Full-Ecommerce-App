const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const connectDB = require("./config/db");
const router = require('./routes/index');
const app = express();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(cookieParser())

// Routes
app.use("/api", router);

const port = 8080;
connectDB().then(() => {
    app.listen(port, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + port);
    });
});
