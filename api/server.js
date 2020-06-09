const express = require('express')
const helmet = require('helmet')

const carsRouter = require('../cars/CarsRouter.js')

const sever = express()

server.use(helmet())
server.use(express.json())

server.use('/api/cars', carsRouter)

module.exports = server