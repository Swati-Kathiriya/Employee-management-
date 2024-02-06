// dependencies
const express = require('express');
const mongoose = require('mongoose');

// DB Connection
mongoose.connect('mongodb://localhost:27017/employee-system')
.then(() => console.log("MongoDB Connected"));


// Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
// app.set("view engine", "ejs");
// app.use(express.static(path.resolve(__dirname, "public")));

// routes
const authRouter = require('./routes/auth'); 
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

// middlewares 
const authMiddleware = require('./middleware/auth');

app.use('/auth',authRouter);
app.use('/employees', employeeRoutes);  
app.use('/attendance',  attendanceRoutes);
app.use('/leaves',  leaveRoutes);

app.get("/", (req,res) => {
    res.send(`<h1>This is HOMEPAGE</h1>`)
})

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));