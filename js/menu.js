function openNav(x) {
  // x.classList.toggle("change");
  mySidenav.classList.toggle("change");
  document.getElementById("mySidenav").style.width = "175px";
  // document.querySelector("body").style.opacity = "0.5";
  // document.getElementById("mySidenav").style.opacity = "1.0";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  mySidenav.classList.toggle("change");
  // document.querySelector("body").style.opacity = "1";
}