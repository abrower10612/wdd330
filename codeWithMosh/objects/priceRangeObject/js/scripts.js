// an array of price range objects
// What properties does each object need?

// properties
// min
// max

let priceRanges = [
  { label: '$', tooltip: 'Inexpensive', minPerPerson: 0, maxPerPerson: 5 },
  { label: '$$', tooltip: 'Moderate', minPerPerson: 6, maxPerPerson: 24 },
  { label: '$$$', tooltip: 'Expensive', minPerPerson: 25, maxPerPerson: 50 }
]

let restaurants = [
  { name: "In-N-Out", averagePricePerPerson: 5},
  { name: "Costa Vida", averagePricePerPerson: 10},
  { name: "Texas Roadhouse", averagePricePerPerson: 30},
  { name: "McDonalds", averagePricePerPerson: 2 }
]

let budget = price(5);


function price(budget) {
  for (let i = 0; i <= restaurants.length - 1; i++) {
    if (budget >= restaurants[i].averagePricePerPerson) {
      console.log("You can afford to eat at " + restaurants[i].name);
    }
  }
}

