const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const logger = require('./middleware/logger')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes');


const app = express()
connectDB();


app.use(logger)
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})