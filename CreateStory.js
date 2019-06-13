/*jshint esversion: 6 */
class storyGame{
	constructor(start, end, moti, comp, rela, auto, stress, fati, task){
		this.Task = task;
		this.StartTime = start;
		this.DeadLine = end;
		this.Motivation = moti;
		this.Competence = comp;
		this.Relatedness = rela;
		this.Autonomy = auto;
		this.Stress = stress;
		this.Fatigue = fati;
		this.Progress = 0;
    this.Chapters = [];
	}
}

class game{
  constructor(story, question, name){
		this.Chapter = name;
    this.Story = story;
    this.Answers = [];
    this["Next chapter"] = [];
    this.Points = {};
    this.Time = [];
    this.Question = question;
  }
}


$(document).ready(function() {
	var story = {};
	var chapt = {};
	var answers = [];
/*	startStory();
	function startStory(){
		story = new storyGame(1500, 9000, 0, 0, 0, 0, 0, 0, "Eat food");
		chapt = new chapter("Lugu on siin", "", "Algus");
		answers.push(10, -5, 7, 12, 25, 2, 10);
		chapt.points["Answer1"] = answers;
		chapt.points["Answer2"] = answers;
		chapt.points["Answer3"] = answers;
		chapt.points["Answer4"] = answers;
		story.chapters.push(chapt);
		story.chapters.push(chapt);
		story.chapters.push(chapt);
		saveStory();
	}*/
	//save
	document.getElementById("savebutton").onclick = getData;
	//next
	document.getElementById("nextbutton").onclick = getData;
	//back
	document.getElementById("backbutton").onclick = getSavedData;



	function getData(){
	  var endTime = getEndTime();
		var startTime = getStartTime();
		story = new storyGame(startTime, endTime, 0, parseInt($("#StatCompetence").val()), parseInt($("#StatRelatedness").val()), parseInt($("#StatAutonomy").val()), parseInt($("#StatStress").val()), parseInt($("#StatFatigue").val()), $("#TaskText").val());
		chapt = new game($("#StoryText").val(), "", "Algus");
		chapt.Answers.push($("#Choice1").val(), $("#Choice2").val(), $("#Choice3").val(), $("#Choice4").val())
	  story.Chapters.push(chapt);
		saveStoryLocal();
	}

	function getEndTime(){
		var time = 0;
		var days = $("#DaysToComplete").val();
		var hours = $("#HoursToComplete").val();
		if (hours < 0 || isNaN(hours) || hours == ""){
			hours = 0;
		} else {
			hours = parseInt(hours);
		}
		if (days < 0 || isNaN(days) || days == ""){
			days = 1;
		} else {
			days = parseInt(days);
		}
		time = days*24+hours;
		return time;
	}
	function getStartTime(){
		var time = $("#TaskTime").val();
		var hours = parseInt(time.charAt(0)+""+time.charAt(1));
		var minutes = parseInt(time.charAt(3)+""+time.charAt(4));
		time = hours+minutes/60
		return time;
	}

	function saveStoryLocal(){
		localStorage.setItem('Story', JSON.stringify(story));
	}

	function saveStory(){
		$.ajax
			({
					type: "GET",
					dataType : 'json',
					async: false,
					url: 'save_json.php',
					data: { data: JSON.stringify(story) },
					success: function () {alert("Thanks!"); },
					failure: function() {alert("Error!");}
			});
			console.log(story);
	};

	function getSavedData(){
		story = JSON.parse(localStorage.getItem('Story'));
		console.log(story);
		// $("#TaskText").val())
		document.getElementById("StatCompetence").value = story.Competence;
		document.getElementById("StatRelatedness").value = story.Relatedness;
		document.getElementById("StatAutonomy").value = story.Autonomy;
		document.getElementById("StatStress").value = story.Stress;
		document.getElementById("StatFatigue").value = story.Fatigue;
		document.getElementById("TaskText").value = story.Task;
		document.getElementById("DaysToComplete").value = Math.floor(story.DeadLine/24);
		document.getElementById("HoursToComplete").value = Math.floor(story.DeadLine%24);
		document.getElementById("StoryText").value = story.Chapters[0].Story;
		document.getElementById("Choice1").value = story.Chapters[0].Answers[0];
		document.getElementById("Choice2").value = story.Chapters[0].Answers[1];
		document.getElementById("Choice3").value = story.Chapters[0].Answers[2];
		document.getElementById("Choice4").value = story.Chapters[0].Answers[3];
		var time;
		if(story.StartTime==0){
			time = "00:00";
		} else {
			//var time;
			var minutes = Math.round((story.StartTime%1)*60);
			if(minutes < 10 && minutes > 0){
				minutes = "0"+minutes.toString();
			} else if (minutes == 0){
				minutes = "00";
			}
			console.log(story.StartTime%1*60);
			console.log(minutes);
			var hours = Math.floor(story.StartTime/1);
			if(hours < 10 && hours > 0){
				hours = "0"+hours.toString();
			} else if (hours == 0){
				hours = "00";
			}
			time = hours+":"+minutes;
		}
		document.getElementById("TaskTime").value = time;
	}
});
