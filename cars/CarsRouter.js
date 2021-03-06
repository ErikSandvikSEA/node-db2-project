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
     requiredProperty('year'),
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

// DELETEs
router.delete(
     '/:id',
     (req, res) => {
          const { id } = req.params
          db('cars')
               .where({
                    id: id
               })
               .del()
               .then(count => {
                    if(count ===1){
                         res.status(200).json({
                              message: 'Vehicle successfully deleted',
                              numberOfAccountsDeleted: count
                         })
                    } else {
                         res.status(404).json({
                              message: 'No vehicles found'
                         })
                    }
               })
               .catch(err => {
                    console.log('DELETE / error', err)
                    res.status(500).json({
                         message: err.message
                    })
               })
     }
)

// PUTs 
router.put(
     '/:id',
     requiredProperty('VIN'),
     requiredProperty('year'),
     requiredProperty('make'),
     requiredProperty('model'),
     requiredProperty('mileage'),
     (req, res) => {
          const { id } = req.params
          const updatedCar = req.body
          db('cars')
               .where({ id: id })
               .update(updatedCar)
               .then(count => {
                    if(count === 1){
                         res.status(200).json({
                              message: 'Vehicle updated!',
                              numberOfAccountsUpdated: count
                         })
                    } else {
                         res.status(404).json({
                              message: 'Vehicle could not be updated, double-check for a valid ID and properties'
                         })
                    }
               })
               .catch(err => {
                    console.log('PUT / error', err)
                    res.status(500).json({
                         message: err.message
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