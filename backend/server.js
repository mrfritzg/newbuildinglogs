// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

const cors = require('cors')

// Setup our Express app
const app = express()

const PORT = 8080 

// Load the connectDB function
const connectDB = require('./config/db')

// Connect to database
connectDB()

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const repairRoutes = require('./routes/RepairRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/posts', postRoutes)
// "/p/" stands for post and all comment routes need a reference to their post
app.use('/comments/', commentRoutes)
app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)
app.use('/repairs', repairRoutes)

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})