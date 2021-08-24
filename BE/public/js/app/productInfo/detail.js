$(document).ready(function () {
  var f = document.getElementById("img");
  var tempImg = document.getElementById("tempImg");
  f.onchange = () => {
    if (f.value) {
      tempImg.style.display = "none";
    } else {
      tempImg.style.display = "";
    }
  };
});
