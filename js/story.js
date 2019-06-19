/*jshint esversion: 6 */
class storyGame{
	constructor(start, end, moti, comp, rela, auto, stress, fati, task){
		this.task = task;
		this.startTime = start;
		this.deadLine = end;
		this.motivation = moti;
		this.rmotivation = 0;
		this.competence = comp;
		this.relatedness = rela;
		this.autonomy = auto;
		this.stress = stress;
		this.fatigue = fati;
		this.progress = 0;
	}
}

$(document).ready(function() {

		var id = 0;
		var game = [];
		var story = {};
		var chapter = [];
		var next = [];
		var question = [];
		var answer = [];
		var points = [];
		var competences = [];
		var relatednesses = [];
		var autonomys = [];
		var stresses = [];
		var fatigues = [];
		var progresses = [];
		var task = [];
		var dateToday = [];
		var time = [];
		var gameStory;
		var motivEval;
		var buttons;
		var oldGame;

		getData();
		function getData(){
			var url = "http://greeny.cs.tlu.ee/~urmoros/projekt/test.json";
			$.getJSON( url, function(data){
				story = data;
			});
		}

		function checkMobile(){
			if (window.location == "game.html"){
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	        window.location = "gamemobile.html";
	    	}
			}
		}
		checkMobile();

		setTimeout(function test(){
			document.getElementById("restart2").onclick = startGame;
			function setStory(){
				gameStory = new storyGame(parseInt(story.StartTime), parseInt(story.DeadLine), story.Motivation, parseInt(story.Competence), parseInt(story.Relatedness), parseInt(story.Autonomy), parseInt(story.Stress), parseInt(story.Fatigue), story.Task);
				oldGame = Object.assign({}, gameStory);
				motivEval = story.Motivation;
				gameStory.rmotivation =  eval(motivEval);
				story.Chapters.forEach(function (chapt, index){
				question.push(chapt.Question);
				game.push(chapt.Story);
				chapter.push(chapt.Chapter);
				var i;
				for (i = 1; i<5; i++){
					var temp = chapt.Points["Answer"+i];
					autonomys.push(parseInt(temp[0]));
					relatednesses.push(parseInt(temp[1]));
					competences.push(parseInt(temp[2]));
					stresses.push(parseInt(temp[3]));
					fatigues.push(parseInt(temp[4]));
					progresses.push(parseInt(temp[5]));
					time.push(parseInt(chapt.Time[i-1]));
					answer.push(chapt.Answers[i-1]);
					var nextChapt = chapt["Next chapter"][i-1];
					next.push(nextChapt);
					}
				});
					console.log(story);
			}
			//console.log(stress);
			function changeData(answer){
				gameStory.autonomy += autonomys[answer];
				changes(autonomys[answer], "autonomy");
				gameStory.relatedness += relatednesses[answer];
				changes(relatednesses[answer], "relatedness");
				gameStory.competence += competences[answer];
				changes(competences[answer], "competences");
				gameStory.stress += stresses[answer];
				changes(stresses[answer], "stress");
				gameStory.fatigue += fatigues[answer];
				changes(fatigues[answer], "fatigue");
				gameStory.progress += progresses[answer];
				changes(progresses[answer], "progress");
				gameStory.startTime += time[answer]/60;
				gameStory.rmotivation = Math.round(eval(motivEval));
			}

			function changes(stats, atr){
				if(stats > 0){
					if(stats <= 5){
						console.log("Your "+atr+" have increased a little");
					} else if(stats <= 14 && stats > 5){
						console.log("Your "+atr+" have increased significantly");
					} else {
						console.log("Your "+atr+" have increased dramatically");
					}
				} else {
					if(stats > -5){
						console.log("Your "+atr+" have decreased a little");
					} else if(stats > -14 && stats < -5){
						console.log("Your "+atr+" have decreased significantly");
					} else {
						console.log("Your "+atr+" have decreased dramatically");
					}
				}
			}

			startGame();
			function progressStr(){
				var progressStatus;
				if (gameStory.progress == 0) { //progressi if, sõnadega
					progressStatus = "Not started";
				} else if (gameStory.progress >= 1 && gameStory.progress <=10){
					progressStatus = "Just started";
				} else if (gameStory.progress > 10 && gameStory.progress <=20){
					progressStatus = "Early stages";
				} else if (gameStory.progress > 20 && gameStory.progress <=30){
					progressStatus = "A little";
				} else if (gameStory.progress > 30 && gameStory.progress <=40){
					progressStatus = "About a third";
				} else if (gameStory.progress > 40 && gameStory.progress <=50){
					progressStatus = "Almost half done";
				} else if (gameStory.progress > 50 && gameStory.progress <=60){
					progressStatus = "Halfway there";
				} else if (gameStory.progress > 60 && gameStory.progress <=70){
					progressStatus = "More than half";
				} else if (gameStory.progress > 70 && gameStory.progress <=80){
				 	progressStatus = "Getting close";
				} else if (gameStory.progress > 80 && gameStory.progress <=90){
					progressStatus = "Almost there";
				} else if (gameStory.progress > 90 && gameStory.progress < 100){
				 	progressStatus = "Virtually ready";
				} else if (gameStory.progress >= 100){
				 	progressStatus = "Done";
				} else {
					progressStatus = "progress  error";
				}
				document.getElementById("Progress").innerHTML = "Progress: "+progressStatus;
			}
			function changeBarColor(barId, percentage){
				if(percentage <= 25){
					document.getElementById(barId).style.backgroundColor = 'red';
				} else if(percentage > 25 && percentage <= 75){
					document.getElementById(barId).style.backgroundColor = 'orange';
				} else {
					document.getElementById(barId).style.backgroundColor = 'green';
				}
			}

			function startGame(){
				buttons = 0;
				setStory();
				progressStr();
				id = 0;
				for(var i of chapter){
					if(i == "default"){
						id = chapter.indexOf(i);
					}
				}
				var i = 0;
				document.getElementById("textarea").innerHTML = game[id];
				document.getElementById("header").style.visibility = 'visible';
				document.getElementById("bottom").style.visibility = 'visible';
				document.getElementById("Auto").innerHTML = gameStory.autonomy+"%";
				document.getElementById("Auto").style.width = gameStory.autonomy+'%';
				changeBarColor("Auto", gameStory.autonomy);
				document.getElementById("Comp").innerHTML = gameStory.competence+"%";
				document.getElementById("Comp").style.width = gameStory.competence+'%';
				changeBarColor("Comp", gameStory.competence);
				document.getElementById("Relat").innerHTML = gameStory.relatedness+"%";
				document.getElementById("Relat").style.width = gameStory.relatedness+'%';
				changeBarColor("Relat", gameStory.relatedness);
				document.getElementById("Motiv").innerHTML = gameStory.rmotivation+"%";
				document.getElementById("Motiv").style.width = gameStory.rmotivation+'%';
				changeBarColor("Motiv",  gameStory.rmotivation);
				document.getElementById("Str").innerHTML = gameStory.stress+"%";
				document.getElementById("Str").style.width = gameStory.stress+'%';
				changeBarColor("Str", 100-gameStory.stress);
				document.getElementById("Prog").innerHTML = gameStory.progress+"%";
				document.getElementById("Prog").style.width = gameStory.progress+'%';
				changeBarColor("Prog", gameStory.progress);
				document.getElementById("Task").innerHTML = "Task: "+gameStory.task;//parseFloat(this.value).toFixed(2);


				var hoursDead = story.StartTime+gameStory.deadLine%24;
				var daysDead = Math.floor(gameStory.deadLine/24+1);
				console.log(hoursDead);
				if(hoursDead >= 24){
					daysDead ++;
					hoursDead = hoursDead-24;
				}
				var gameEnd = "Day "+ daysDead + ", "+ hoursDead +":00";

				document.getElementById("Deadline").innerHTML = "Deadline: "+gameEnd;

				var minutes = Math.floor(gameStory.startTime-gameStory.startTime%24);
				if(minutes < 10){
					minutes =  Math.floor(gameStory.startTime-gameStory.startTime%24) +"0";
				} else {
					 Math.floor(gameStory.startTime-gameStory.startTime%24);
				}
				var gameStart = "Day "+ Math.floor(gameStory.startTime/24+1) + ", "+ Math.floor(gameStory.startTime%24) +":"+ minutes;

				document.getElementById("Today").innerHTML = "Today: "+gameStart;
				console.log(answer);
				if(answer[(id*4)] == ""){
					document.getElementById("button1").style.visibility = 'hidden';
				} else {
					buttons++;
					document.getElementById("button1").innerHTML = answer[(id*4)];
					document.getElementById("button1").style.visibility = 'visible';
				}
				if(answer[(id*4)+1] == ""){
					document.getElementById("button2").style.visibility = 'hidden';
				} else {
					buttons++;
					document.getElementById("button2").innerHTML = answer[(id*4)+1];
					document.getElementById("button2").style.visibility = 'visible';
				}
				if(answer[(id*4)+2] == ""){
					document.getElementById("button3").style.visibility = 'hidden';
				} else {
					buttons++;
					document.getElementById("button3").innerHTML = answer[(id*4)+2];
					document.getElementById("button3").style.visibility = 'visible';
				}
				if(answer[(id*4)+3] == ""){
					document.getElementById("button4").style.visibility = 'hidden';
				} else {
					buttons++;
					document.getElementById("button4").innerHTML = answer[(id*4)+3];
					document.getElementById("button4").style.visibility = 'visible';
				}
				changeButtonsLocation(buttons);
				document.getElementById("button1").onclick = nextChapter;
				document.getElementById("button2").onclick = nextChapter;

			}

			function nextChapter(){
				document.getElementById("button1").disabled = true;
				document.getElementById("button2").disabled = true;
				document.getElementById("button3").disabled = true;
				document.getElementById("button4").disabled = true;
				oldGame = Object.assign({}, gameStory);
				console.log(oldGame);
				var x = parseInt($(this).val(), 10);
				changeData(x+(id*4));
				var nextChapt = next[x+(id*4)];
				for(var i of chapter){
					if(i == nextChapt){
						id = chapter.indexOf(i);
					}
				}
				progressStr();
				checkStatus();
				document.getElementById("textarea").innerHTML = game[id];
				document.getElementById("header").style.visibility = 'visible';
				move("autonomy", "Auto");
				changeBarColor("Auto", gameStory.autonomy);
				move("competence", "Comp");
				changeBarColor("Comp", gameStory.competence);
				move("relatedness", "Relat");
				changeBarColor("Relat", gameStory.relatedness);
				move("rmotivation", "Motiv");
				changeBarColor("Motiv",  eval(motivEval));
				move("stress", "Str");
				changeBarColor("Str", 100-gameStory.stress);
				move("progress", "Prog");
				changeBarColor("Prog",gameStory.progress);

				function move(stat, id) {
				  var elem = document.getElementById(id);
				  var width = oldGame[stat];
				  var i = setInterval(frame, 10);
				  function frame() {
				    if (width == gameStory[stat] || width >= 100 || width <=0) {
							if(width>100){
								elem.style.width = '100%';
								elem.innerHTML = "100%";
							}
				      clearInterval(i);
				    } else if(gameStory[stat]-width>0) {
				      width++;
				      elem.style.width = width + '%';
							elem.innerHTML = width+"%";
				    } else {
							width--;
				      elem.style.width = width + '%';
							elem.innerHTML = width+"%";
							console.log("Negavtiivne");
						}
				  }
				}

				var minutes = Math.floor(gameStory.startTime*60-Math.floor(gameStory.startTime)*60);
				if(minutes < 10){
					minutes =  Math.floor(gameStory.startTime*60-Math.floor(gameStory.startTime)*60) +"0";
				} else {
					 Math.floor(gameStory.startTime*60-Math.floor(gameStory.startTime)*60);
				}

				var gameStart = "Day "+ Math.floor(gameStory.startTime/24+1) + ", "+ Math.floor(gameStory.startTime%24) +":"+ minutes;


				document.getElementById("Today").innerHTML = "Today: "+gameStart;
				if(answer[(id*4)+1] == ""){
					document.getElementById("button2").style.visibility = 'hidden';
				} else {
					document.getElementById("button2").innerHTML = answer[(id*4)+1];
					document.getElementById("button2").style.visibility = 'visible';
					if(gameStory.progress < 100){
						document.getElementById("button2").disabled = false;
					}
				}
				if(answer[(id*4)] == ""){
					document.getElementById("button1").style.visibility = 'hidden';
				} else {
					document.getElementById("button1").innerHTML = answer[(id*4)];
					document.getElementById("button1").style.visibility = 'visible';
					if(gameStory.progress < 100){
						document.getElementById("button1").disabled = false;
					}
				}
				if(answer[(id*4)+2] == ""){
					document.getElementById("button3").style.visibility = 'hidden';
				} else {
					document.getElementById("button3").innerHTML = answer[(id*4)+2];
					document.getElementById("button3").style.visibility = 'visible';
					if(gameStory.progress < 100){
						document.getElementById("button3").disabled = false;
					}
				}
				if(answer[(id*4)+3] == ""){
					document.getElementById("button4").style.visibility = 'hidden';
				} else {
					document.getElementById("button4").innerHTML = answer[(id*4)+3];
					document.getElementById("button4").style.visibility = 'visible';
					if(gameStory.progress < 100){
						document.getElementById("button4").disabled = false;
					}
				}
			}
			function checkStatus(){
				if(gameStory.startTime > gameStory.deadLine){
						document.getElementById("Progress").innerHTML = "Progress: Over DeadLine";
				}
			}

			function changeButtonsLocation(x){
				if(x == 2){

				}
			}
	 }, 100);
});

function infoPop(){
	var popup = document.getElementById("popup");
	popup.classList.toggle("show");
}
