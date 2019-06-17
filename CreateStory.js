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

class ChapterStatus{
	constructor(){
		this.Chapter = [];
		this.Status = [];
	}
}

var story = {};
var lastChapt = "";
var index = 0;

$(document).ready(function() {
	//save
	document.getElementById("savebutton").onclick = getData;
	//next
	document.getElementById("nextbutton").onclick = showChapters;
	//back
	document.getElementById("backbutton").onclick = getSavedData;

	getSavedData();
});

function getData(){
	var endTime = getEndTime();
	var startTime = getStartTime();
	var chapt = {};
	if (localStorage.getItem("Story") === null) {
		story = new storyGame(startTime, endTime, 0, parseInt($("#StatCompetence").val()), parseInt($("#StatRelatedness").val()), parseInt($("#StatAutonomy").val()), parseInt($("#StatStress").val()), parseInt($("#StatFatigue").val()), $("#TaskText").val());
		chapt = new game($("#StoryText").val(), "", "default");
		chapt.Answers.push($("#Choice1").val(), $("#Choice2").val(), $("#Choice3").val(), $("#Choice4").val())
		chapt["Next chapter"].push($("#NextChap1").val(), $("#NextChap2").val(), $("#NextChap3").val(), $("#NextChap4").val());
		story.Chapters.push(chapt);
	} else {
		story = JSON.parse(localStorage.getItem('Story'));
		/*if(chap.Chapter == name){
			story.Chapters.splice(index, 1);
		}*/
	}
	var status = new ChapterStatus();
	status.Chapter.push("default");
	status.Status.push(1);
	story.Chapters.forEach(function (chapt, index){
		for (i = 0; i<4; i++){
					var name = chapt["Next chapter"][i];
					status.Chapter.push(chapt["Next chapter"][i]);
					status.Status.push(0);
			}
	});
	saveStoryLocal(status);
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

function saveStoryLocal(c){
	localStorage.setItem('Story', JSON.stringify(story));
	localStorage.setItem('Status', JSON.stringify(c));
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
}

function getSavedData(){
	story = JSON.parse(localStorage.getItem('Story'));
	if (localStorage.getItem("Story") !== null) {
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
		/*var next =  story.Chapters[0]["Next chapter"][0];
		console.log(next);*/
		document.getElementById("NextChap1").value = story.Chapters[0]["Next chapter"][0];
		document.getElementById("NextChap2").value = story.Chapters[0]["Next chapter"][1];
		document.getElementById("NextChap3").value = story.Chapters[0]["Next chapter"][2];
		document.getElementById("NextChap4").value = story.Chapters[0]["Next chapter"][3];
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
}

function showChapters(){
	getData();
	document.getElementById("nextbutton").onclick = showAllChapters;
	document.getElementById("clearbutton").onclick = showAllChapters;
	document.getElementById("savebutton").onclick = saveData;
	story = JSON.parse(localStorage.getItem('Story'));
	var status = JSON.parse(localStorage.getItem('Status'));

	if(lastChapt == ""){
		lastChapt = "default";
	}
	var text = "";
	for(i= 0; i<status.Chapter.length; i++){
		text += '<div id="chapter">';
				if(status.Chapter[i] != ""){
					var name = status.Chapter[i];
					if(status.Status[i] == 1){
						text += `<button id="button" style="color:green;" onclick="newChapter('${name}', ${i})";>`+name+`</button>`;
					} else {
						text += `<button id="button" style="color:red;" onclick="newChapter('${name}', ${i})";>`+name+`</button>`;
					}
				}
		text += '</div>';
	};
	document.getElementById("StoryText").value = "";
	document.getElementById("Choice1").value = "";
	document.getElementById("Choice2").value = "";
	document.getElementById("Choice3").value = "";
	document.getElementById("Choice4").value = "";
	document.getElementById("NextChap1").value = "";
	document.getElementById("NextChap2").value = "";
	document.getElementById("NextChap3").value = "";
	document.getElementById("NextChap4").value = "";
	document.getElementById("ADTT").innerHTML = text;
}

function newChapter(name, i){
	var text = "";
	window.index = i;
	var status = JSON.parse(localStorage.getItem('Status'));
	if(status.Status[i] == 1){
		loadData(name, i);
	} else {
		document.getElementById("StoryText").value = "";
		document.getElementById("Choice1").value = "";
		document.getElementById("Choice2").value = "";
		document.getElementById("Choice3").value = "";
		document.getElementById("Choice4").value = "";
		document.getElementById("NextChap1").value = "";
		document.getElementById("NextChap2").value = "";
		document.getElementById("NextChap3").value = "";
		document.getElementById("NextChap4").value = "";
	}
}

function loadData(name, i){
	var index = Math.floor(((i-1)/4)+1);
	document.getElementById("StoryText").value = story.Chapters[index].Story;
	document.getElementById("Choice1").value = story.Chapters[index].Answers[0];
	document.getElementById("Choice2").value = story.Chapters[index].Answers[1];
	document.getElementById("Choice3").value = story.Chapters[index].Answers[2];
	document.getElementById("Choice4").value = story.Chapters[index].Answers[3];
	document.getElementById("NextChap1").value = story.Chapters[index]["Next chapter"][0];
	document.getElementById("NextChap2").value = story.Chapters[index]["Next chapter"][1];
	document.getElementById("NextChap3").value = story.Chapters[index]["Next chapter"][2];
	document.getElementById("NextChap4").value = story.Chapters[index]["Next chapter"][3];
}


function showAllChapters(){
	story = JSON.parse(localStorage.getItem('Story'));
	var status = JSON.parse(localStorage.getItem('Status'));
	var text = "";
	for(i= 0; i<status.Chapter.length; i++){
		text += '<div id="chapter">';
				if(status.Chapter[i] != ""){
					var name = status.Chapter[i];
					if(status.Status[i] == 1){
						text += `<button id="button" style="color:green;" onclick="newChapter('${name}', ${i})";>`+name+`</button>`;
					} else {
						text += `<button id="button" style="color:red;" onclick="newChapter('${name}', ${i})";>`+name+`</button>`;
					}
				}
		text += '</div>';
	};
	document.getElementById("StoryText").value = "";
	document.getElementById("Choice1").value = "";
	document.getElementById("Choice2").value = "";
	document.getElementById("Choice3").value = "";
	document.getElementById("Choice4").value = "";
	document.getElementById("NextChap1").value = "";
	document.getElementById("NextChap2").value = "";
	document.getElementById("NextChap3").value = "";
	document.getElementById("NextChap4").value = "";
	document.getElementById("ADTT").innerHTML = text;
}

function saveData(){
	var name = JSON.parse(localStorage.getItem('Status'));
	story = JSON.parse(localStorage.getItem('Story'));
	name = name.Chapter[index];
	var chapt = {};
	var answers = [];
	chapt = new game($("#StoryText").val(), "", name);
	chapt.Answers.push($("#Choice1").val(), $("#Choice2").val(), $("#Choice3").val(), $("#Choice4").val())
	chapt["Next chapter"].push($("#NextChap1").val(), $("#NextChap2").val(), $("#NextChap3").val(), $("#NextChap4").val());
	var i = Math.floor(((index-1)/4)+1);
	story.Chapters.forEach(function (chap, index){
		if(chap.Chapter == name){
			story.Chapters.splice(i, 1);
		}
	});
	story.Chapters.push(chapt);
	var status = new ChapterStatus();
	status.Chapter.push("default");
	status.Status.push(1);
	story.Chapters.forEach(function (chapt, index){
		for (i = 0; i<4; i++){
					var name = chapt["Next chapter"][i];
					status.Chapter.push(chapt["Next chapter"][i]);
					status.Status.push(0);
			}
	});
	status.Status[index]=1;
	saveStoryLocal(status);
	showAllChapters();
}
