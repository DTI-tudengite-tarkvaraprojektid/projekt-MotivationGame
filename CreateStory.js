/*jshint esversion: 6 */
class storyGame{
	constructor(start, end, moti, comp, rela, auto, stress, fati, task){
		this.task = task;
		this.startTime = start;
		this.deadLine = moti;
		this.motivation = comp;
		this.competence = rela;
		this.relatedness = rela;
		this.autonomy = auto;
		this.stress = stress;
		this.fatigue = fati;
		this.progress = 0;
    this.chapters = [];
	}
}

class chapter{
  constructor(story, question, name){
		this.chapter = name;
    this.story = story;
    this.answers = [];
    this.nextChapter = [];
    this.points = {};
    this.time = [];
    this.question = question;
  }
}


$(document).ready(function() {
	var story = {};
	var chapt = {};
	var answers = [];
	startStory();
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
});
