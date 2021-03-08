function openNav() {
  document.querySelector("main").style.opacity = "50%";
  document.getElementById("headerContent").style.opacity = "50%";
  document.getElementById("mySidenav").style.width = "175px";
  mySidenav.classList.toggle("menuBorder");
}

function closeNav() {
  document.getElementById("headerContent").style.opacity = "100%";
  document.querySelector("main").style.opacity = "100%";
  document.getElementById("mySidenav").style.width = "0";
  mySidenav.classList.toggle("menuBorder");
}