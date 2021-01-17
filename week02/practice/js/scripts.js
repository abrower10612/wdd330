function discount() {
  const fullPrice = document.getElementById("fullPrice").value;
  if (fullPrice <= 10) {
    const discountPrice = fullPrice * 0.95;
    document.getElementById("output").innerHTML = "5% Discount";
    document.getElementById("output2").innerHTML = "Discounted Price: $" + discountPrice;  
}

  else if (fullPrice <= 40) {
    const discountPrice = fullPrice * 0.85;
    document.getElementById("output").innerHTML = "15% Discount";
    document.getElementById("output2").innerHTML = "Discounted Price: $" + discountPrice;
  }

  else {
    const discountPrice = fullPrice * 0.75;
    document.getElementById("output").innerHTML = "25% Discount";
    document.getElementById("output2").innerHTML = "Discounted Price: $" + discountPrice;  
}

}