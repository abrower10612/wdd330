// ***EXCEPTIONS AND STACK TRACES***
function unicorn(){};
function three(){ unicorn(); }
function two(){ three(); }
function one(){ two(); }
one();


// ***STRICT MODE***
function test() {
'use strict'

var e = 2.718;
console.log(e);
}


// ***THE TRUSTY ALERT***
function amIOldEnough(age){
  if (age === 12) {
    alert(age)
    return 'No, sorry.';
  } else if (age < 18) {
    return 'Only if you are accompanied by an adult.';
  }
  else {
    return "Yep, come on in!";
  }
}


// ***ERROR OBJECTS***
const error = new Error('Oops, something went wrong');
const error2 = new TypeError('You need to use numbers in this function');

function squareRoot(number) {
  'use strict';
  if (number < 0) {
    throw new RangeError('You cannot find the square root of negative numbers')
  }
  return Math.sqrt(number);
};

console.log('square root of 121:');
console.log(squareRoot(121));
console.log('')
// console.log(squareRoot(-1));


// EXCEPTION HANDLING
function imaginarySquareRoot(number) {
  'use strict';
  try {
    return String*squareRoot(number);
  }
  catch(error) {
    return squareRoot(-number)+'i';
  }
}

console.log('square root of -49:')
console.log(imaginarySquareRoot(-49));
console.log('')

function imaginarySquareRoot2(number) {
  'use strict';
  let answer;
  try {
    answer = String(squareRoot(number));
  }
  catch(error) {
    answer = squareRoot(-number)+'i';
  }
  finally {
    return `+ or - ${answer}`;
  }
}

console.log('finally block:')
console.log('square root of -63:')
console.log(imaginarySquareRoot2(-36));
console.log('')


// TESTS
function itSquareRoots4() {
  return squareRoot(4) === 2;
}

console.log('itSquareRoots4() === 2:')
console.log(itSquareRoots4());
console.log('')


// JEST
function squareRoot(number) {
  'use strict';
if (number < 0) {
throw new RangeError("You can't find the square root of negative numbers")
}
return Math.sqrt(number);
};

// 'use strict';
// function factorsOf(n) {
// const factors = [];
// for (let i=1; i <= n ; i++) {
//     if (n/i === Math.floor(n/i)){
//     factors.push(i);
//     }
// }
// return factors;
// }

function factorsOf(n) {
  if(Number.isNaN(Number(n))) {
      throw new RangeError('Argument Error: Value must be an integer');
  }
  if(n < 0) {
      throw new RangeError('Argument Error: Number must be positive');
  }
  if(!Number.isInteger(n)) {
      throw new RangeError('Argument Error: Number must be an integer');
  }
  const factors = [];
  for (let i=1 , max = Math.sqrt(n); i <= max ; i++) {
      if (n%i === 0){
      factors.push(i,n/i);
      }
  }
  return factors.sort((a,b) => a - b);
}

function isPrime(n) {
  try{
      return factorsOf(n).length === 2;
  } catch(error) {
      return false;
  }
  }

test('square root of 4 is 2', () => {
  expect(squareRoot(4)).toBe(2);
});

test('factors of 12', () => {
  expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
});
  
test('2 is prime', () => {
  expect(isPrime(2)).toBe(true);
});

test('10 is not prime', () => {
  expect(isPrime(10)).not.toBe(true);
});

it('should throw an exception for non-numerical data', () => {
  expect(() => factorsOf('twelve')).toThrow();
});

it('should throw an exception for negative numbers', () => {
  expect(() => factorsOf(-2)).toThrow();
});

it('should throw an exception for non-integer numbers', () => {
  expect(() => factorsOf(3.14159)).toThrow();
});