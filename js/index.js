$(document).ready(function() {
  if (localStorage.getItem("Story") === null) {
    document.getElementById("gameName").innerHTML = "Complete two homework assignments in 3 days. The assignments need to be done well.";
  } else {
    var story = JSON.parse(localStorage.getItem('Story'));
    console.log(story);
    document.getElementById("gameName").innerHTML = story.Task;
  }
});
