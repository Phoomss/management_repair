require('dotenv').config({path:'config.env'})
const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors');
const { autoCreateAdmin } = require('./controllers/authController.js');
const rootRouter = require('./routes/index.js');
const PORT = process.env.PORT || 4000;
const app = express()

// Connect to MongoDB
connectDB();
autoCreateAdmin()

// middelwares
app.use(cors());
app.use(express.json());
app.use(rootRouter)

// Start the server

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));