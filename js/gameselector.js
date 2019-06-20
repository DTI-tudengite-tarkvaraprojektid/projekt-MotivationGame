/*jshint esversion: 6 */
$(document).ready(function() {
  document.getElementById("defaultstory").onclick = clearStorage;
});
function clearStorage(){
  localStorage.clear();
  location.href = 'index.html';
}
