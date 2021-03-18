
// ***************************************
// FACTORY FUNCTION
function factory(street, city, zipCode) {
  return {
    street,
    city,
    zipCode
  };
}

let address = factory("123", "Santaquin", 84655);
console.log(address);

// ***************************************
// CONSTRUCTOR FUNCTION

function Constructor(street, city, zipCode) {
  this.street = street;
  this.city = city;
  this.zipCode = zipCode;
}

let address2 = new Constructor("123", "Santaquin", 84655);
console.log(address2);

// ***************************************
