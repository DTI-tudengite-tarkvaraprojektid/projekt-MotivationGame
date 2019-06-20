$(document).ready(function() {
  if (localStorage.getItem("Story") === null) {
    document.getElementById("gameName").innerHTML = "";
  } else {
    story = JSON.parse(localStorage.getItem('Story'));
    document.getElementById("gameName").innerHTML = story.Task;
  }
});
