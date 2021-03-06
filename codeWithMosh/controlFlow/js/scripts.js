// MAX OF TWO NUMBERS
// max(10, 70);

  function max(a, b) {
    if (a > b) console.log(a);
    else console.log(b);
  }



// LANDSCAPE OR PORTRAIT
// isLandscape(700, 100);

function isLandscape(width, height) {
  if (width > height) console.log("Landscape");
  else console.log("Portrait");
}



// FIZZBUZZ
// fizzBuzz(10);

function fizzBuzz() { 
  let input = fizzBuzz(7);
  console.log(input);

  function fizzBuzz(input) {
    if (typeof input !== 'number') {
      return 'Not a number';
    }
    else if (input % 3 === 0 && input % 5 === 0) {
      return "FizzBuzz"
    }
    else if (input % 3 === 0) {
      return "Fizz"
    }
    else if (input % 5 === 0) {
      return "Buzz"
    }
    else {
      return input;
    }
  }
}



// DEMERIT POINTS
// checkSpeed(80);

function checkSpeed(speed) {
  const speedLimit = 70
  const kmPerPoint = 5;
  const pointLimit = 11;

  let limit = speedLimit;

  if (speed < limit + kmPerPoint) {
    console.log("ok");
    return;
  }

  let points = Math.floor((speed - limit) / kmPerPoint);

  if (points > pointLimit) {
    console.log("License suspended");
  }
  else {
    console.log("Points:", points);
  }
}


// EVEN AND ODD NUMBERS
// showNumbers(10);

function showNumbers(limit) {
  for (i = 0; i <= limit; i++) {
    const message = (i % 2 === 0) ? 'EVEN' : 'ODD'
    console.log(i, message);
  }
}

// COUNT TRUTHY
// truthy();

function truthy() {
  const array = [0, null, undefined, '', 1, 2, 3, 4, 5];

console.log(countTruthy(array));

}

function countTruthy(array) {
  let truthies = 0;
  for (index of array) if (index) truthies += 1;
  return truthies;
}


// STRING PROPERTIES
// stringProperties();

function stringProperties() {
  const movie = {
    Title: 'Batman',
    releaseYear: 2020,
    rating: 'PG13',
    director: 'John Smith',
    score: 4.5
  };

  showProperties(movie);
}

function showProperties(obj) {
  for (let key in obj)
    if (typeof obj[key] === 'string')
      console.log(key, obj[key]);
}



// SUM OF MULTIPLES OF 3 AND 5
// multiples();

function multiples() {
  console.log(sum(10));
}

function sum(limit) {
  let total = 0;

  for (let i = 0; i <= limit; i++) 
    if (i % 3 === 0 || i % 5 === 0)
      total += i;

  return total;
}



// AVERAGE OF GRADES
// grades();

function grades() {
  const marks = [80, 80, 80];

  console.log(calculateGrade(marks));
}

function calculateGrade(marks) {
  const average = calculateAverage(marks)

  if (average < 60) return 'F';
  if (average < 70) return 'D';
  if (average < 80) return 'C';
  if (average < 90) return 'B';
  return 'A';

}

function calculateAverage(array) {
  let sum = 0;

  for (let value of array) {
    sum += value;
  }

  return sum / array.length;
}

// STARS
// showStars(10);

function showStars(rows) {

  let stars = '';

  for(let i = 1; i <= rows; i++) { 
    stars += '*';
    console.log(stars);
  }
}

// PRIME NUMBERS
// showPrimes(20);

function showPrimes(limit) {
  for (let number = 2; number <= limit; number++)
    if (isPrime(number)) console.log(number);
}

function isPrime(number) {
  for (let factor = 2; factor < number; factor++)
    if (number % factor === 0)
      return false;

  return true;
}