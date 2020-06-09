const express = require('express')
const db = require('../data/connection.js')

const router = express.Router()

//GETs
router.get('/', (req, res) => {
     db('cars')
     .then(cars => {
          res.json(cars)
     })
     .catch(err => {
          res.status(500).json({
               message: 'Failed to retrieve cars'
          })
     })
})

router.get('/:id', (req, res) => {
     const { id } = req.params
     db('cars').where({ id }).first()
     .then(car => {
          res.json(car)
     })
     .catch(err => {
          res.status(500).json({
               message: 'Failed to retrieve car'
          })
     })
})

//POSTs
router.post(
     '/',
     requiredProperty('make'),
     requiredProperty('model'),
     requiredProperty('mileage'),
     (req, res) => {
          const carData = req.body
          db('cars')
               .insert(carData)
               .then(ids => {
                    db('cars')
                         .where({
                              id: ids[0]
                         })
                         .then(newCarEntry => {
                              res.status(201).json(newCarEntry)
                         })
               })
               .catch(err => {
                    console.log('POST error', error)
                    res.status(500).json({
                         message: 'Error occurred while posting'
                    })
               })
     }
)


//middleware
function requiredProperty(property) {
     return function(req, res, next){
       if(!req.body[property]) {
         res.status(400).json({ message: `Needs to have a ${property} property` })
       } else {
         next()
       }
     }
   }

   module.exports = router