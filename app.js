const express = require('express')
const connectDB = require('./db/connection')
const product = require('./routes/product')
const bodyParser = require('body-parser')
const users = require('./routes/user')
const notFound = require('./middleware/notFound')
const cartItems = require('./routes/cart')

require('dotenv').config();


const app  = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', product)
app.use('/api/v1', users)
app.use('/api/v1', cartItems)
app.use(notFound)


const port = process.env.PORT || 3000


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
        
    }
}

start()