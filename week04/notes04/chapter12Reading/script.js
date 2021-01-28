// This is one way of creating an array
constructedArray = new Array(1,2,3);
console.log(constructedArray);

// This way is better in JS
const constructedArray2 = [4, 5, 6];
console.log(constructedArray2);

class Dice {

  constructor(sides=6, color='blue') {
    this.sides = sides;
    this.color = color;
  }

  roll() {
  return Math.floor(this.sides * Math.random() + 1)
  }

  static description() {
    return 'A way of choosing random numbers'
  }
 
}

// Creating an instance of the Dice class using the new operator
const redDice = new Dice(20, 'red');
console.log("The red dice are " + redDice.color + " and they have " + redDice.sides + " sides.");
console.log(redDice);

const blueDice = new Dice(16, 'blue');
console.log("The blue dice are " + blueDice.color + " and they have " + blueDice.sides + " sides.");
console.log(blueDice);

const greenDice = new Dice(10, 'green');
console.log("If I roll the green dice, I get: " + greenDice.roll());

// Instantiate a copy of redDice without having to reference the actual constructor 
// function or class declaration directly.
const yellowDice = new redDice.constructor(10);
console.log(yellowDice instanceof Dice);

// A static method is called by the class directly rather than by instances of the class
console.log('');
console.log(Dice.description());


class Turtle {
  constructor(name) {
    this.name = name;
    this.weapon = 'feet';
    let _color = color;
    this.setColor = (color) => {
      if(typeof color === 'string') {
        return _color = color;
      }
     else {
       throw new Error('Color must be a string');
     }
    }
    this.getColor = () => _color;
  }

  sayHi() {
    return `Hi dude, my name is ${this.name}`;
  }

  attack() {
    return `Feel the power of my ${this.weapon}!`;
  }
}

// Prototype property is for augmenting the class with extra methods and properties
// after the class has been created
Turtle.prototype.food = function() {
  this.food = food;
  return `My favorite food is ${this.food}.`;
}

Turtle.prototype.color = function() {
  this.color = color;
  return `My bandana is ${this.color}.`;
}
console.log('');


// Creating instances of the Turtle class
const leo = new Turtle('Leonardo', color='blue');
console.log(leo.sayHi());
console.log(leo.color());
console.log(leo.attack());
console.log(leo.weapon);
console.log('')


const raph = new Turtle('Raphael', color='red');
console.log(raph.sayHi());
console.log(raph.color());
console.log(raph.attack());
console.log('');


const mikey = new Turtle('Michaelangelo', color='orange');
console.log(mikey.sayHi());
console.log(mikey.color());
console.log(mikey.attack());
console.log('');


const donnie = new Turtle('Donatello', color='purple');
console.log(donnie.sayHi());
console.log(donnie.color());
console.log(donnie.attack());
console.log('');

console.log('Turtle is the prototype of donnie: ' + Turtle.prototype.isPrototypeOf(donnie));
console.log('Dice is the prototype of donnie: ' + Dice.prototype.isPrototypeOf(donnie));
console.log('')

console.log('raph has its own property of name: ' + raph.hasOwnProperty('name'));


// Overwriting prototype properties with 'own properties'
leo.weapon='Katana Blades';
raph.weapon = 'Sai';
donnie.weapon = 'Bo Staff';

console.log(leo);
console.log(raph);
console.log(mikey);
console.log(donnie);

// Adding a method to the prototype
Turtle.prototype.food = 'Pizza'

Turtle.prototype.eat = function() {
  return `Mmm this ${this.food} is so good!`;
}

console.log(Turtle.prototype.eat());
console.log('');

// Augment an instance with its own individual property
console.log(mikey.name);
mikey.weapon = 'Nunchakus';
console.log(mikey.weapon);
console.log(mikey.attack());
console.log('');

// Public and Private Methods
console.log(raph.getColor());
console.log(raph.color);

// The next line results in: 'error: Uncaught Error: Color must be a string'
// console.log(raph.setColor(4)); 

// **INHERITANCE**
// All examples above utilize inheritance by inheriting properties and methods from the prototype.
// However, all prototypes have a prototype of their own and this ongoing chain 
// is called the prototype chain.

// The Prototype Chain
console.log(Object.getPrototypeOf(raph));

// Looks like an empty object literal, but it's actually an instance of the built-in Object()
// constructor function.
console.log(Object.getPrototypeOf(Object.getPrototypeOf(raph)));

// Displays 'null' because all prototype chains end at the Object() constructor function.
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(raph))));
console.log('')

// The JS engine will first check to see if the object has that method. If not, it will check
// the prototype and then that prototype's prototype, all the way up until it reaches the prototype 
// of the Object() constructor function.
// console.log(raph.makePizza()); **results in: 'TypeError: raph.makePizza is not a function'**

// Enumerable Properties
console.log(Turtle.prototype.propertyIsEnumerable('eat')); //returns true

// The line below returns false because 'toString' is not enumerable
console.log(Object.prototype.propertyIsEnumerable('toString'));

// Not even 'propertyIsEnumerable' is enumerable, so it returns false
Object.prototype.propertyIsEnumerable('propertyIsEnumerable');

// Good practice is for all built-in methods to be non-enumerable and any user-defined methods to be
// made enumerable. This makes it easy to only see user-defined methods


// Inheritance using 'extends'
class Fish {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hello, my name is ${this.name}`;
  }

  swim() {
    return `${this.name} can swim in water`;
  }
}

  class Shark extends Fish {
    constructor(name) {
      super(name);
      this.weapon = 'teeth';
    }

    attack() {
      return `Feel the power of my ${this.weapon}!`;
    }
  }

console.log('')
const hammerhead = new Shark('Bucky');
console.log(hammerhead.name);
console.log(hammerhead.attack());
console.log(hammerhead.swim());

// POLYMORPHISM means that different objects can have the same method, but implement it in different
// ways. Objects are able to override a method with a more specific implementation.


console.log(2..toString());

console.log(raph.toString());

Number.prototype.isEven = function() {
  return this%2 === 0;
}

Number.prototype.isOdd = function() {
  return this%2 === 1;
}

// Adding methods to built-in objects
console.log(42..isEven());

console.log(765234..isOdd());


// Adding more methods to the prototype of JavaScript's built-in objects is called Monkey-Patching
// It is discouraged in the JS community but openly accepted in the Ruby community
Array.prototype.first = function() {
  return this[0];
}

Array.prototype.last = function() {
  return this[this.length -1];
}

console.log('');
const turtles = ['Leo', 'Donnie', 'Mikey', 'Raph'];
console.log('The first turtle is ' + turtles.first());
console.log('The last turtle is ' + turtles.last());

console.log(' hello '.trim());
console.log('')

// While monkey-patching built-in objects can seem a good way to add extra or missing functionality
// it can also add unexpected behavior. Avoid it unless it is absolutely necessary



class myArray extends Array {
  constructor(...args){
    super(...args);
  }
  delete(i) {
    return this.splice(i,1);
  }
}

const list = new myArray(1,2,3);

console.log(list);

console.log(list.delete(1));

console.log(list);
console.log('');


// GETTERS AND SETTERS
const me = {name: 'Andrew'};
console.log(Object.getOwnPropertyDescriptor(me, 'name'));
Object.getOwnPropertyDescriptor(me, 'name');

me.age = 29;
me.retirementAge = 65;

Object.defineProperty(me, 'yearsToRetirement', {
  get() {
    if (this.age > this.retirementAge) {
      return 0;
    }
    else {
      return this.retirementAge - this.age;
    }
  },
  set(value) {
    this.age = this.retirementAge - value;
    return value;
  }
});

console.log(me.yearsToRetirement + ' years to retirement');

Object.defineProperty(me, 'age', {
  get() {
    return 21;
  },
  set(value) {
    return value;
  }
})

console.log(me.age = 30);

console.log(me.age);

// Another example of getters and setters
class newDice {
  constructor(sides = 8){
    Object.defineProperty(this, 'sides', {
      get() {
        return `This dice has ${sides} sides`;
      },
      set(value) {
        if(value > 0) {
                  sides = value;
        return sides;
        }
        else {
          throw new Error('The nmber of sides must be positive');
        }
      }
    });
    this.roll = function() {
      return Math.floor(sides * Math.random() + 1)
    }
  }
}

const purpleDice = new newDice;

console.log(purpleDice.sides);

purpleDice.sides = 10;

console.log(purpleDice.sides);

// CREATING OBJECTS FROM OTHER OBJECTS
const Human = {
  arms: 2,
  legs: 2,
  walk() {
    console.log('Walking');
  }
}

const lois = Object.create(Human);

console.log('Lois has ' + lois.arms + ' arms');
console.log('');

console.log(lois.walk());

console.log(Human.isPrototypeOf(lois));

lois.name = 'Lois Lane';
console.log(lois.name);

lois.job = 'Reporter';
console.log(lois.job);

// OBJECT-BASED INHERITANCE
const Superhuman = Object.create(Human);

Superhuman.change = function() {
  return `${this.realName} goes into a phone box and comes out as ${this.name}!`;
}

Superhuman.name = 'Name Needed';

Superhuman.realName = 'Real Name Needed';

const superman = Object.create(Superhuman);

superman.name = 'Superman';
superman.realName = 'Clark Kent';

// The Superman object has inherited the change() method from the Superhuman object:
console.log(superman.change()); 
console.log('');

// A more efficient way of adding custom properties with a constructor function and an init() method:
Superhuman.init = function(name, realName) {
  this.name = name;
  this.realName = realName;
  this.init = undefined // this line removes the init function, so it can only be called once
  return this;
}

const batman = Object.create(Superhuman);
batman.init('Batman', 'Bruce Wayne');

console.log(batman.change());
console.log('')

// Create and initialize a new object in a single line with the technique called 'chaining':
const aquaman = Object.create(Superhuman).init('Aquaman', 'Arthur Curry');
console.log(aquaman.change());
console.log('');

// OBJECT PROTOTYPE CHAIN

console.log('Superhuman is the prototype of superman: ' + Superhuman.isPrototypeOf(superman));

console.log('Human is the prototype of Superhuman: ' + Human.isPrototypeOf(Superhuman));

console.log('Superhuman is the prototype of batman: ' + Superhuman.isPrototypeOf(batman));
console.log('');

// MIXINS

const a = {};

const b = { name: 'JavaScript' };

console.log(Object.assign(a,b)); // Assign properties of const b to const a

console.log(a.name); // the 'name' property is assigned to const a now


// In order to change both objects, Object.assign(a,b) must be used.
const c = {};

const d = { numbers: [1,2,3] };

console.log(Object.assign(c,d));

d.numbers.push(4);
console.log(d.numbers);

console.log(c.numbers);

function mixin(target,...objects) {
  for (const object of objects) {
    if(typeof object === 'object') {
      for (const key of Object.keys(object)) {
        if (typeof object[key] === 'object') {
          target[key] = Array.isArray(object[key]) ? [] : {};
          mixin(target[key], object[key]);
        }
        else {
          Object.assign(target,object);
        }
      }
    }
  }
  return target;
}

const e = {}, f = { foo: 'bar' }, g = {numbers: [1,2,3] };

console.log(mixin(e,f,g));

console.log(g.numbers.push(4));

console.log(e.numbers);

console.log(g.numbers);

const wonderWoman = Object.create(Superhuman);

mixin(wonderWoman,{ name: 'Wonder Woman', realName: 'Diana Prince' });

console.log(wonderWoman.change());
console.log('')

// Makes a copy of an object including its properties and methods to be used by the copy
function copy(target) {
  const object = Object.create(Object.getPrototypeOf(target));
  mixin(object,target);
  return object;
}

const bizarro = copy(superman);

console.log(bizarro.name);
console.log(bizarro.realName = 'Subject B-0');
console.log(bizarro.change());

// FACTORY FUNCTIONS

function createSuperhuman(...mixins) {
  const object = copy(Superhuman);
  return mixin(object,...mixins);
}

const hulk = createSuperhuman({name: 'Hulk', realName: 'Bruce Banner'});

console.log(hulk.change());
console.log('')


// USING THE MIXIN FUNCTION TO ADD MODULAR FUNCTIONALITY

const flight = {
  fly() {
    console.log(`Up, up and away! ${this.name} soars through the air!`);
    return this;
  }
}

const superSpeed = {
  move() {
    console.log(`${this.name} can move faster than a speeding bullet!`);
    return this;
  }
}

const xRayVision = {
  xray() {
    console.log(`${this.name} can see right through you!`);
    return this;
  }
}

mixin(superman, flight, superSpeed, xRayVision);

mixin(wonderWoman, flight, superSpeed);

console.log(superman.xray());

console.log(wonderWoman.fly());


// creates a superhero object, inherits all default properties, and has the correct name details and
// relevant powers
const flash = createSuperhuman( { 
  name: 'Flash',
  realName: 'Barry Allen',
}, superSpeed);

console.log(flash.change());

console.log(flash.move());

// CHAINING FUNCTIONS

console.log(superman.fly().move().xray());

// BINDING 'THIS'

// Use 'that = this'

superman.friends = [batman, wonderWoman, aquaman]

superman.findFriends = function() {
  const that = this;
  this.friends.forEach(function(friend) {
    console.log(`${friend.name} is friends with ${that.name}`);
  });
}

console.log(superman.findFriends());
console.log('');

// Use 'bind(this)'
superman.findFriends = function() {
  this.friends.forEach(function(friend) {
    console.log(`${friend.name} is friends with ${this.name}`);
  }.bind(this));
}

console.log('***Using bind(this) instead of "const that = this"');
console.log(superman.findFriends());
console.log('');

// Use for-of instead of forEach()
superman.findFriends = function() {
  for(const friend of this.friends) {
    console.log(`${friend.name} is friends with ${this.name}`);
  };
}

console.log('***this is using for-of instead of forEach()***');
console.log(superman.findFriends());
console.log('')

// USE ARROW FUNCTIONS
superman.findFriends = function() {
  this.friends.forEach((friend) => {
    console.log(`${friend.name} is friends with ${this.name}`);
  });
}

console.log('***Using arrow functions instead of any of the above options***');
console.log(superman.findFriends());
console.log('');

// BORROWING METHODS FROM PROTOTYPES
const fly = superman.fly;

console.log(fly.call(batman));

