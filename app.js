const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// Middlewares
const errorMiddleware = require("./middlewares/error");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookRoutes = require("./routes/bookRoutes")
const borrowRoutes = require("./routes/borrowRoutes")

// Initialize Express App
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", borrowRoutes);

app.use(errorMiddleware);


module.exports = app;
