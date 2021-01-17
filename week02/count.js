function addFunction() {
  let num = document.getElementById("number").value;
  let i = parseInt(num);
  while (Number.isInteger(i) == false) {
    document.getElementById("output").innerHTML = "Please enter a valid positive number";
    break
  }
  if (Number.isInteger(i)) {
    document.getElementById("output").innerHTML = "Good job";
  }

}