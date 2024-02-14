const express = require('express');
const path = require('path');
const connectDB = require('./config/ConnectDB');
const multer = require('multer');

const app = express();
app.use(express.json());
connectDB();

const router = require('./routes/book');
app.use('/book', router);

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

const uploadRoute = require("./routes/upload");
app.use("/uploads", uploadRoute);

app.listen(5000, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on port 5000`);
    }
});
