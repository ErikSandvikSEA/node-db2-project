exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert(generateData());
    });
};

function generateData() {
  return [
    {
      VIN: 1234567891234567,
      year: 1993,
      make: 'BMW',
      model: '325i',
      mileage: 135990
    },
    {
      VIN: 8883822,
      year: 1979,
      make: 'BMW',
      model: '320i',
      mileage: 77220
    },
    {
      VIN: 5602884883949458,
      year: 1992,
      make: 'Ford',
      model: 'Ranger',
      mileage: 63837
    },
    {
      VIN: 6600155922925959,
      year: 1985,
      make: 'Chevrolet',
      model: 'S10 Blazer',
      mileage: 86234
    },
    {
      VIN: 7787787786699958,
      year: 1982,
      make: 'Plymouth',
      model: 'Arrow Truck',
      mileage: 78544
    },
    {
      VIN: 8882020001000049,
      year: 2010,
      make: 'Nissan',
      model: 'Versa',
      mileage: 140221
    },  
  ]
}