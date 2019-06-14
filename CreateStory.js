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

var story = {};
var lastChapt = "";

$(document).ready(function() {
	//save
	document.getElementById("savebutton").onclick = getData;
	//next
	document.getElementById("nextbutton").onclick = showChapters;
	//back
	document.getElementById("backbutton").onclick = getSavedData;
});

function getData(){
	var endTime = getEndTime();
	var startTime = getStartTime();
	var chapt = {};
	story = new storyGame(startTime, endTime, 0, parseInt($("#StatCompetence").val()), parseInt($("#StatRelatedness").val()), parseInt($("#StatAutonomy").val()), parseInt($("#StatStress").val()), parseInt($("#StatFatigue").val()), $("#TaskText").val());
	chapt = new game($("#StoryText").val(), "", "default");
	chapt.Answers.push($("#Choice1").val(), $("#Choice2").val(), $("#Choice3").val(), $("#Choice4").val())
	chapt["Next chapter"].push($("#NextChap1").val(), $("#NextChap2").val(), $("#NextChap3").val(), $("#NextChap4").val());
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
}

function getSavedData(){
	story = JSON.parse(localStorage.getItem('Story'));
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

function showChapters(){
	story = JSON.parse(localStorage.getItem('Story'));
	if(lastChapt == ""){
		lastChapt = "default";
	}
	//getData();
	document.getElementById("twodivs").innerHTML = "";
	var text = "";
	story.Chapters.forEach(function (chapt, index){
		text += '<div id="chapter">';
		for (i = 0; i<4; i++){
				if(chapt["Next chapter"][i] != ""){
					var name = chapt["Next chapter"][i];
					text += `<button id="button" onclick="newChapter('${name}','${lastChapt}')";>`+name+`</button>`;
				}
			}
		text += '</div>';
	});
	console.log(text)
	document.getElementById("twodivs").innerHTML = text;
}

function newChapter(name, lastChapt){
	var text = "";
	text += '<div id="ADTT">'
	text += '<h2>How much did this choice change your attributes?</h2>';
	text += '<label>Autonomy:</label>    <input id="StatAutonomy" min="-100" max="100" type="number" placeholder="Level of autonomy"><br><br>';
	text += '<label>Competence:</label>  <input id="StatCompetence" type="number"placeholder="Level of competence"><br><br>'
	text += '<label>Relatedness:</label> <input id="StatRelatedness" type="number" placeholder="Level of relatedness"><br><br>';
	text += '<label>Stress:</label>      <input id="StatStress" type="number" placeholder="Level of stress"><br><br>';
	text += '<label>Fatigue:</label>     <input id="StatFatigue" type="number" placeholder="Level of fatigue"><br><br>';
	text += '</div>';
	text += '<div id="textandchoices">';
	text += '<h2>Write your story and create your choices.</h2>';
	text += '<label>Story text:</label> <textarea id="StoryText" rows="5" cols="43" placeholder="Insert your story here."></textarea> <br><br>';
	text += '<label>Choice 1: </label> <textarea id="Choice1" rows="2" cols="20" placeholder="Insert your first choice here."></textarea> <textarea id="NextChap1" rows="2" cols="20" placeholder="Next chapter"></textarea><br><br>';
	text += '<label>Choice 2: </label> <textarea id="Choice2" rows="2" cols="20" placeholder="Insert your second choice here."></textarea> <textarea id="NextChap2" rows="2" cols="20" placeholder="Next chapter"></textarea><br><br>';
	text += '<label>Choice 3: </label> <textarea id="Choice3" rows="2" cols="20" placeholder="Insert your third choice here."></textarea> <textarea id="NextChap3" rows="2" cols="20" placeholder="Next chapter"></textarea><br><br>';
	text += '<label>Choice 4: </label> <textarea id="Choice4" rows="2" cols="20" placeholder="Insert your fourth choice here."></textarea> <textarea id="NextChap4" rows="2" cols="20" placeholder="Next chapter"></textarea><br><br>';
	text += '<input type="button" value="Back" id="backbutton" class="button">';
	text += '<input type="button" value="Next" id="nextbutton" class="button">';
	text += `<input type="button" value="Save" id="saveChapter" onclick="saveChapter('${name}','${lastChapt}')" class="button">`;
	text += '<input type="button" value="Edit" id="editbutton" class="button">';
	text += '</div>';
	document.getElementById("twodivs").innerHTML = text;
	document.getElementById("editbutton").onclick = editStory;
}

function saveChapter(name, lastChapt){
	var chapt = {};
	var answers = [];
	chapt = new game($("#StoryText").val(), "", name);
	addPoints(name);
	chapt.Answers.push($("#Choice1").val(), $("#Choice2").val(), $("#Choice3").val(), $("#Choice4").val())
	chapt["Next chapter"].push($("#NextChap1").val(), $("#NextChap2").val(), $("#NextChap3").val(), $("#NextChap4").val());
	story.Chapters.forEach(function (chap, index){
		if(chap.Chapter == name){
			story.Chapters.splice(index, 1);
		}
	});
	story.Chapters.push(chapt);
	lastChapt = name;
	saveStoryLocal();
}

function addPoints(name){
	console.log(name);
	var points = [];
	story.Chapters.forEach(function (chapt, index){
		if(chapt.Chapter == lastChapt){
			for (i = 0; i<4; i++){
				if(chapt["Next chapter"][i] == name){
					points.push(parseInt($("#StatAutonomy").val()), parseInt($("#StatRelatedness").val()), parseInt($("#StatCompetence").val()), parseInt($("#StatStress").val()), parseInt($("#StatFatigue").val()));
					console.log(chapt.Points[i]);
					chapt.Points["Answer"+(i+1)] = points;
					console.log(chapt);
				}
			}
		}
	});
}

function editStory(){
	console.log("Edit story function started!");
	story = JSON.parse(localStorage.getItem("Story"));
	document.getElementById("twodivs").innerHTML = "";
	story.Chapters.forEach(function (chapt, index){
		text += '<div id="chapter">';
		for (i = 0; i<4; i++){
				if(chapt["Next chapter"][i] != ""){
					var name = chapt["Next chapter"][i];
					text += `<button id="button";>`+name+`</button>`;
				}
			}
		text += '</div>';
	});
}
