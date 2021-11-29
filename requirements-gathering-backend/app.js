const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

const port = process.env.PORT
const uri = process.env.ATLAS_URI

if (process.env.NODE_ENV === 'production')
    app.use(cors({ credentials: true, origin: 'https://[prod-url].com' }))
else
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/requirements', require('./routes/requirements'))

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(() => console.log('MongoDB database connection failed'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})