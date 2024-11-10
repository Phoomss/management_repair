const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')

const app = express()

// Connect to MongoDB
connectDB();

// middelwares
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));