checkMobileInd();
function checkMobileInd(){
  if (window.location == "http://www.tlu.ee/~mamba/uus/"){
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location = "indexmobile.html";
    }
  }
}

// checkMobileSel();   kui teeme game selectori lehe
// function checkMobileSel(){
//   if (window.location == "http://www.tlu.ee/~mamba/uus/gameselector.html"){
//     if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//       window.location = "gameselectormobile.html";
//     }
//   }
// }

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
