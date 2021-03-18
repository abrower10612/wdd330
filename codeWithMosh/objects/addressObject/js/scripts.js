let address = {
  street: "73 South 300 West",
  city: "Santaquin",
  zipCode: 84655
};

function showAddress() {
  document.getElementById("output").innerHTML = address.street + ", " + address.city + ", " + address.zipCode;
}

