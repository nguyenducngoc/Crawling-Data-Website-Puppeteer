var btnDropdown = document.querySelector(".dropbtn");
var dropdownContent = document.querySelector(".dropdown-content");
btnDropdown.addEventListener("click", function () {
//   dropdownContent.style.display = "block";
 
  if (dropdownContent.classList.contains("show")){
    dropdownContent.classList.remove("show");
    btnDropdown.classList.add("fa-angle-down");
    btnDropdown.classList.remove("fa-angle-up");
    
  }
  else {
    dropdownContent.classList.add("show");
    btnDropdown.classList.remove("fa-angle-down");
    btnDropdown.classList.add("fa-angle-up");

  }

});
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    dropdownContent.classList.remove('show');
  }
//   if( dropdownContent.classList.contains('show')) {
//     dropdownContent.classList.remove('show');
//   }
};
