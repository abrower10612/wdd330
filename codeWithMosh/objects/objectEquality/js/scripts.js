let address1 = new Address("73 South 300 West", "Santaquin", 84655);
let address2 = new Address("73 South 300 West", "Santaquin", 84655);
let address3 = address2;

// their properties are equal to each other
console.log(areEqual(address1, address2)); 

// they do not reference the same object in memory
console.log(areSame(address1, address2)); 

// address2 and address 3 do reference the same object in memory
console.log(areSame(address2, address3)); 


function Address(street, city, zipCode) {
  this.street = street;
  this.city = city;
  this.zipCode = zipCode;
}

// are their properties equal? Yes.
function areEqual(address1, address2) {
  return address1.street === address2.street &&
    address1.city === address2.city &&
    address1.zipCode === address2.zipCode;
}

// are they referencing the same object in memory? No. 
function areSame (address1, address2) {
  return address1 === address2;
}
