// OBJECT-ORIENTED PROGRAMMING
// oop();

function oop() {
  let circle = {
    radius: 1,
    location: {
      x: 1,
      y: 1
    },
    isVisible: true,
    draw: function() { // the draw method of the circle object
      console.log('draw')
    }
  };
  
  circle.draw(); // method
}




// FACTORY FUNCTIONS (camelNotation)
// factoryFunctions();

function factoryFunctions() {
  function createCircle(radius) {
    return {
      radius,
  
      draw() {
        console.log('draw')
      }
    };
  }

const circle1 = createCircle(1);
console.log(circle1);

const circle2 = createCircle(2);
console.log(circle2);
}


// NOTE: FACTORY FUNCTIONS AND CONSTRUCTOR FUNCTIONS DO THE SAME THING, BUT DEVELOPERS WITH EXPERIENCE IN LANGUAGES SUCH AS C# AND JAVA ARE MORE USED TO CONSTRUCTOR FUNCTIONS


// CONSTRUCTOR FUNCTIONS (PascalNotation)
// constructorFunctions();

function constructorFunctions() {
  function Circle(radius) {
    this.radius = radius; // 'this' refers to the object
    this.draw = function() {
      console.log('draw');
    }
  }
  
  const circle = new Circle(1);
}



// DYNAMIC NATURE OF OBJECTS
// dynamic();

function dynamic() {
  
  const circle = { // the variable 'circle' is a constant, but can be changed by adding or removing properties as shown below
    radius: 1
  };
  
  circle.color = 'yellow';
  circle.draw = function() {}
  
  delete circle.color; // removes a property from an object
  
  console.log(circle);
}


// CONSTRUCTOR PROPERTY (not constructor function)

  let x = {}; // let x = new Object();

  // new String(); is the constructor of '', "", and ``
  // Every object has a constructor property and it used to create that object



// FUNCTIONS ARE OBJECTS
// functionsAreObjects();

function functionsAreObjects() {

  function Circle(radius) {
    this.radius = radius;
    this.draw = function() {
      console.log('draw');
    }
  }
  
  Circle.call({}, 1);
  Circle.apply({}, [1, 2, 3]);
  
  const another = new Circle(1);

}


// VALUE VS REFERENCE TYPES
// valueVsReference();

function valueVsReference() {

  // Primitives are copied by their value
  // Objects are copied by their reference

  let x = { value: 10 };
  let y = x;

  x.value = 20;

  console.log("x:");
  console.log(x);

  console.log("y:");
  console.log(y);

// new example
  let obj = { value: 10 };

  function increase(boj) {
    obj.value++; // because obj is an object, all changes are visible inside the function and outside of it
  }

  increase(obj);

  console.log(obj);
  
}

// ENUMERATING PROPERTIES OF AN OBJECT
// enumerating();

function enumerating() {
  const circle = {
    radius: 1,
    draw() {
      console.log('draw');
    }
  };

  for (let key in circle) {
    console.log(key, circle[key]);
  }

  //for (let key of circle) // objects are not iterable, so a for of loop cannot be used
    // console.log(key);

  for (let key of Object.keys(circle)) console.log(key);// 'Object' is a built-in constructor function

  for (let entry of Object.entries(circle)) console.log(entry);

  if ('radius' in circle) console.log('yes');
}


// CLONING AN OBJECT
// cloning();

function cloning() {

  const circle = {
    radius: 1,
    draw() {
      console.log('draw');
    }
  };

  // this is an old way of cloning an object
  const another1 = {};

  for (let key in circle)
    another1[key] = circle[key];

  console.log(another1);


  // this is a more modern way of cloning an object
  const another2 = Object.assign({}, circle); 

  console.log(another2);


  // and an even better way to clone an object
  const another3 = { ...circle };
  console.log(another3);

}


// GARBAGE COLLECTION
// garbage();

function garbage() {

  // modern javascript includes an automatic process of allocating and deallocating memory
  let circle = {  };
  console.log(circle);

}



// MATH. FUNCTION
// math();

function math() {

  // generates a random number between 0 and 1
  console.log(Math.random())

  // generates a random number between 25 and 50
  console.log(Math.random() * (50 - 25) + 25);

  // rounds to nearest integer
  console.log(Math.round(1.9))

  // returns the largest number included in the parameters
  console.log(Math.max(1,6,3,9,27,400,288));

}



// STRINGS
// string();

function string() {

  // a string primitive
  const message = 'hi';

  // a string object
  const another = new String('hi');

  console.log(typeof(message));
  console.log(typeof(another));

  // find the length of a primitive string type
  const message2 = 'This is my first message';
  console.log(message2.length);

  //find a character in a specific index
  console.log(message2[0]);

  // does the string include a specific character or group of characters
  console.log(message2.includes('my'));
  console.log(message2.includes('not'));

  // does the string start with a specific character or word (case sensitive)
  console.log(message2.startsWith("This"));

  // replace a part of a string
  console.log(message2.replace('first', 'second'));
  console.log(message2); // .replace does not change the original string, but creates a new one

  // .trim will remove the white space before or after the string
  const message3 = "   Hello World       ";
  console.log(message3.trim());
  console.log(message3.trimLeft());
  console.log(message3.trimRight());

  // escape notation
  const message4 = 'This is my brother\'s fourth message';
  console.log(message4);

  const message5 = 'This is my \nfifth message';
  console.log(message5);

  console.log(message5.split(' '))

}


// TEMPLATE LITERALS
// tempLits();

function tempLits() {

  // ugly and old
  const message = 
  'This is my\n' + 
  '\'first\' message';
  console.log(message);

  // much better
  const another = `This is my 
'first' message`;
  console.log(another);

  const name = 'John';
  const message2 = 'Hi ';

const message3 = 
`Hi ${name},
  
Thank you for joining my mailing list.

Regards,

  Andrew`

  console.log(message3);
}



// DATE
date();

function date() {

  // Date() is a constructor function
  const now = new Date();
  const date1 = new Date('May 11 2018 09:00');
  const date2 = new Date(2021, 4, 11, 9);

  console.log(now.toDateString());
  console.log(now.toTimeString());
  console.log(now.toISOString());

}