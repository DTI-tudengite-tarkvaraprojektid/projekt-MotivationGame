$(document).ready(function() {
  if (localStorage.getItem("Story") === null) {
    document.getElementById("gameName").innerHTML = "";
  } else {
    var story = JSON.parse(localStorage.getItem('Story'));
    console.log(story);
    document.getElementById("gameName").innerHTML = story.Task;
  }
});
