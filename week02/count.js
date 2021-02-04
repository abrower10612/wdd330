function addFunction() {
  let num = document.getElementById("number").value;
  let i = parseInt(num);
  if (Number.isInteger(i) == false || num <= 0) {
    document.getElementById("output").innerHTML = "Please enter a valid positive number";
  }
  else {
    document.getElementById("output").innerHTML = "Good job, you correctly entered a posistive integer.";
  }

}