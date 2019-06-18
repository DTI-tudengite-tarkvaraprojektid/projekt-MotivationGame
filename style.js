checkMobileInd();
function checkMobileInd(){
  if (window.location == "index.html"){
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location = "indexmobile.html";
    }
  }
}

window.onscroll = function() {myFunction();};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function clearContents(element) {
  element.value = '';
}

$(document).ready(function(){
  for(i = -100; i <= 100; i++){
    for(j = 1; j < 21; j++){
      $("#dropdown"+j).append("<option value="+i+">"+i+"</option>");
    }
  }
  for(i = 0; i <= 480; i++){
    for(j = 21; j < 25; j++){
      $("#dropdown"+j).append("<option value="+i+">"+i+"</option>");
    }
  }
});
