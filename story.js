/*jshint esversion: 6 */
class storyGame{
	constructor(start, end, moti, comp, rela, auto, stress, fati, task){
		this.task = task;
		this.startTime = start;
		this.deadLine = end;
		this.motivation = moti;
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

		getData();
		function getData(){
			var url = "Story.json";
			$.getJSON( "Story.json", function(data){
				story = data;
			});
		}
		setTimeout(function test(){
			setStory();

			function setStory(){
				gameStory = new storyGame(story.Starting, story.Deadline, story.Motivation, story.Competence, story.Relatedness, story.Autonomy, story.Stress, story.Fatigue, story.Task);
				//console.log(eval(motivation));
				story.Game.forEach(function (chapt, index){
				question.push(chapt.Question);
				game.push(chapt.Story);
				chapter.push(chapt.Chapter);
				var i;
				for (i = 1; i<5; i++){
					var temp = chapt.Points["Answer"+i];
					autonomys.push(temp[0]);
					relatednesses.push(temp[1]);
					competences.push(temp[2]);
					stresses.push(temp[3]);
					fatigues.push(temp[4]);
					progresses.push(temp[5]);
					time.push(chapt.Time[i-1]);
					answer.push(chapt.Answers[i-1]);
					var nextChapt = chapt["Next chapter"][i-1];
					next.push(nextChapt);
					}
				});
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
				gameStory.startTime += time[answer];
				console.log(stresses);
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
				if (progress == 0) { //progressi if, sõnadega
					progress = "Not started";
				} else if (progress >= 1 && progress <=10){
					progress = "Just started";
				} else if (progress > 10 && progress <=20){
					progress = "Early stages";
				} else if (progress > 20 && progress <=30){
					progress = "A little";
				} else if (progress > 30 && progress <=40){
					progress = "About a third";
				} else if (progress > 40 && progress <=50){
					progress = "Almost half done";
				} else if (progress > 50 && progress <=60){
					progress = "Halfway there";
				} else if (progress > 60 && progress <=70){
					progress = "More than half";
				} else if (progress > 70 && progress <=80){
				 progress = "Getting close";
				} else if (progress > 80 && progress <=90){
					progress = "Almost there";
				} else if (progress > 90 && progress < 100){
				 progress = "Virtually ready";
				} else if (progress == 100){
				 progress = "Done";
				} else {
				console.log ("progressi error");
				}
			}

			function startGame(){
				document.getElementById("textarea").innerHTML = game[0];
				if(answer[(id*4)] == ""){
					document.getElementById("button1").style.visibility = 'hidden';
				} else {
					document.getElementById("button1").innerHTML = answer[(id*4)];
					document.getElementById("button1").style.visibility = 'visible';
				}
				if(answer[(id*4)+1] == ""){
					document.getElementById("button2").style.visibility = 'hidden';
				} else {
					document.getElementById("button2").innerHTML = answer[(id*4)+1];
					document.getElementById("button2").style.visibility = 'visible';
				}
				if(answer[(id*4)+2] == ""){
					document.getElementById("button3").style.visibility = 'hidden';
				} else {
					document.getElementById("button3").innerHTML = answer[(id*4)+2];
					document.getElementById("button3").style.visibility = 'visible';
				}
				if(answer[(id*4)+3] == ""){
					document.getElementById("button4").style.visibility = 'hidden';
				} else {
					document.getElementById("button4").innerHTML = answer[(id*4)+3];
					document.getElementById("button4").style.visibility = 'visible';
				}
				document.getElementById("button1").onclick = nextChapter;
				document.getElementById("button2").onclick = nextChapter;
			}

			function nextChapter(){
				var x = parseInt($(this).val(), 10);
				changeData(x+(id*4));
				var nextChapt = next[x+(id*4)];
				for(var i of chapter){
					if(i == nextChapt){
						id = chapter.indexOf(i);
					}
				}
				document.getElementById("textarea").innerHTML = game[id];
				if(answer[(id*4)] == ""){
					document.getElementById("button1").style.visibility = 'hidden';
				} else {
					document.getElementById("button1").innerHTML = answer[(id*4)];
					document.getElementById("button1").style.visibility = 'visible';
				}
				if(answer[(id*4)+1] == ""){
					document.getElementById("button2").style.visibility = 'hidden';
				} else {
					document.getElementById("button2").innerHTML = answer[(id*4)+1];
					document.getElementById("button2").style.visibility = 'visible';
				}
				if(answer[(id*4)+2] == ""){
					document.getElementById("button3").style.visibility = 'hidden';
				} else {
					document.getElementById("button3").innerHTML = answer[(id*4)+2];
					document.getElementById("button3").style.visibility = 'visible';
				}
				if(answer[(id*4)+3] == ""){
					document.getElementById("button4").style.visibility = 'hidden';
				} else {
					document.getElementById("button4").innerHTML = answer[(id*4)+3];
					document.getElementById("button4").style.visibility = 'visible';
				}
				console.log(gameStory);
			}

	 }, 100);
});
