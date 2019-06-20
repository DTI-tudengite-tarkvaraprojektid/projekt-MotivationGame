/*jshint esversion: 6 */
$(document).ready(function() {
  document.getElementById('json-file').onchange = function() {
    var txt = document.getElementById("json-file").value;
    txt = txt.substring(12);
    document.getElementById("file-name").innerHTML = txt;
};
  document.getElementById("defaultstory").onclick = clearStorage;
});
function clearStorage(){
  localStorage.clear();
  location.href = 'index.html';
}
