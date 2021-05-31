const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const Render = require('./controllers/resultController')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// DB Connection
require('./database/connection')

// Definição dos routes
const fileRoutes = require('./routes/file') // uncomment when the file is created
const phoneMessageRoutes = require('./routes/phoneMessage')

const app = express()

// Using morgan to log
app.use(logger('dev'))
app.use(express.static('public')) //to access the files in public folder
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Middleware before routes to append headers and other config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    // Return informations about our methods
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})

// Routes middleware to handle requests
app.use('/file', fileRoutes) // I will uncomment when I create the file
app.use('/phoneMessage', phoneMessageRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Route not found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  Render.Res(res, err.status || 500, null, err && err.data ? err.data : null, err)
})

module.exports = app
