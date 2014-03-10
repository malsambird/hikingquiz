$(document).ready(function(){

var guess;
var currentQuestion = 0;
var onNumber = 0;
var group;
var points = 0;

var updateProgress = function(){
	$("#onNumber").text(onNumber);
};

var updateScore = function(){
	$("#score_tracker").text(points);
};

var showStartButton = function(){
		$("#start").show();
};
var hideStartButton = function() {
	$("#start").hide();
};

var showNextButton = function(){
		$("#next").show();
};
var hideNextButton = function() {
	$("#next").hide();
};

var communicate = function(message) {
	$("h2").text(message);
};




function Question (picture, choices, radioButtons, answer, moreInfo) {
	this.picture= picture;
	this.choices= choices;
	this.radioButtons = radioButtons;
	this.answer = answer;
	this.moreInfo= moreInfo;
	
	this.displayQuestion =function(){
		$("#background img").hide();
		communicate("Where is this trail?");
		this.picture.show();
		this.choices.show();
	};

	this.removeQuestion = function(){
		this.choices.hide();
		this.picture.hide();
	};

	this.showMoreInfo= function(){
		this.choices.hide();
		$("#options").prepend("<p>"+this.moreInfo+"</p>");
		showNextButton();
		
	};
	this.hideMoreInfo = function() {
		$("div#options p").remove();
		hideNextButton();
	};

	this.validateGuess= function () {
		var uncheckedRadioButton = 0;
		var group=document.getElementsByName(Questions[currentQuestion].radioButtons); //later change for each q
		for (var i = 0; i < group.length; i++) {
			if (group[i].checked === true) {
             guess = group[i].value;
				if(guess === Questions[currentQuestion].answer) {
				communicate("Correct!");
				points++;
				updateScore();
				} else {
				communicate("Incorrect");
				}
			} else {
				uncheckedRadioButton++;
				if(uncheckedRadioButton === 4){
					alert("You forgot to click an option!");
					communicate("No answer!");
					
				}
			}
		}
	};
}

Question1 = new Question($("#huangshan"), $("#q1"), "q1", "China");
Question1.moreInfo = "Huangshan (Yellow Mountain) is one of China's holiest Mountains.";

Question2 = new Question($("#machu"), $("#q2"), "q2", "Peru");
Question2.moreInfo = "This llama lives in the famous Machu Pichu in Peru.";

Question3 = new Question($("#mcafee"), $("#q3"), "q3", "America");
Question3.moreInfo = "McAfee Lookoff is along the Appalachianin in Virginia, USA.";

Question4 = new Question($("#maligne"), $("#q4"), "q4", "Canada");
Question4.moreInfo = "Maligne Lake is in Japser National Park, Canada.";

Question5 = new Question($("#nepal"), $("#q5"), "q5", "Nepal");
Question5.moreInfo = "These hikers snapped this photo doing the Poon Hill trek in Nepal!";

var Questions = [Question1, Question2, Question3, Question4, Question5];


//START
showStartButton();
communicate("Ready to go?");
$("#start").click(function(){
	hideStartButton();
	Questions[currentQuestion].displayQuestion();
	onNumber++;
	updateProgress();
	});

Questions[currentQuestion].choices.find("input:submit").click(function(event){
	event.preventDefault();
	Questions[currentQuestion].validateGuess();
	Questions[currentQuestion].choices.hide();
	Questions[currentQuestion].showMoreInfo();

//});
$("#next").click(function(){
	Questions[currentQuestion].hideMoreInfo();
	currentQuestion++;

	//---- IF at end of the quiz, display f results ----	
	if (currentQuestion === Questions.length) {
		currentQuestion--;
		Questions[currentQuestion].hideMoreInfo();
		Questions[currentQuestion].removeQuestion();
		$("#start_image").show();
		communicate("You made it!");
		$("#ongoing_quiz").hide();
		$("#end_quiz").show();
		$("#score_results").text(points);
		return;
	// ELSE display next question		
	} else {
		onNumber++;
		updateProgress();
		Questions[currentQuestion].displayQuestion();
		}
	//On click of the "Guess" button 
	Questions[currentQuestion].choices.find("input:submit").click(function(event){
		event.preventDefault();
		Questions[currentQuestion].validateGuess();
		Questions[currentQuestion].choices.hide();
		Questions[currentQuestion].showMoreInfo();
	});


});
});
//*** RESET Button ****
var reset = function(){
	$("div#options p").remove();
	hideStartButton();
	showStartButton();
	Questions[currentQuestion].hideMoreInfo();
	Questions[currentQuestion].removeQuestion();
	communicate("Ready to go?");
	$("#ongoing_quiz").show();
	$("#end_quiz").hide();
	$("#start_image").show();
	
	hideNextButton();
	$("div#options p").remove();
	$('input:radio').removeAttr('checked');
	currentQuestion = 0;
	onNumber = 0;
	updateProgress();
	points = 0;
	updateScore();
};


$("#restart").click(function(){
	reset();
});

$("#playagain").click(function(){
	reset();
});
});

