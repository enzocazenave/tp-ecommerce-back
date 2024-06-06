const express = require('express')
const http = require('http')
const cors = require('cors')
const logger = require('morgan')
const { connectToMongo } = require('../databases/mongo')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.EXPRESS_SERVER_PORT
    this.server = http.createServer(this.app)
  }

  setDefaultMiddlewares() {
    this.app.use(cors({}))
    this.app.use(express.json())
    this.app.use(logger('dev'))
  }

  setRoutes() {
    this.app.use('/auth', require('../routes/auth.routes'))
    this.app.use('/products', require('../routes/product.routes'))
    this.app.use('/records', require('../routes/record.routes'))
    this.app.use('/cart', require('../routes/cart.routes'))
  }

  connectDatabases() {
    connectToMongo()
  }

  start() {
    this.setDefaultMiddlewares()
    this.setRoutes()
    this.connectDatabases()

    this.server.listen(this.port, () => {
      console.log('EXPRESS SERVER RUNNING ON PORT: ', this.port)
    })
  }
}

module.exports = Server