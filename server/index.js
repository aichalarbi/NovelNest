const express = require('express');
const path = require('path');
const connectDB = require('./config/ConnectDB');

const app = express();
app.use(express.json());
connectDB();

const router = require('./routes/book');
app.use('/book', router);

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadRoute = require("./routes/upload");
app.use("/api/uploads", uploadRoute);

app.listen(5000, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on port 5000`);
    }
});
