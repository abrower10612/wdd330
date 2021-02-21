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
valueVsReference();

function valueVsReference() {


  
}






