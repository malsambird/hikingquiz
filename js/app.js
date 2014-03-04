$(document).ready(function(){


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




function Question (picture, choices, answer, moreInfo) {
	this.picture= picture;
	this.choices= choices;
	this.answer = answer;
	this.moreInfo= moreInfo;
	this.feedback= feedback;
	


	this.displayQuestion =function(){
		$("#background img").hide();
		communicate("Where is this trail?");
		this.picture.show();
		this.choices.show();
	};
	this.showMoreInfo= function(){
		this.choices.hide();
		$("#options").prepend(this.moreInfo);
		showNextButton();
		
	};
	this.hideMoreInfo = function() {
		$("#options").removeChild();
		hideNextButton();
	};
}

Question1 = new Question($("#huangshan"), $("#q1"), "China");
Question1.moreInfo = "Yellow Mountain is one of China's holiest Mountains.";

Question2 = new Question($("#machu"), $("#q2"), "Peru");
Question2.moreInfo = "This is in Peru blah blah blah";

Question3 = new Question($("#mcafee"), $("#q3"), "America");
Question3.moreInfo = "This lookoff is in Virginia and its part of the Appalachian trail.";

Question4 = new Question($("#maligne"), $("#q4"), "Canada");
Question4.moreInfo = "This is in Japser National Park, Alberta.";

Question5 = new Question($("#nepal"), $("#q5"), "Nepal");
Question5.moreInfo = "blah blah blah Poon Hill, Nepal";

var Questions = [Question1, Question2, Question3, Question4, Question5];
var currentQuestion = 0;

//START
showStartButton();
communicate("Ready to go?");
$("#start").click(function(){
	hideStartButton();
	Questions[currentQuestion].displayQuestion();
	});
$("#guess").click(function(event){
	event.preventDefault();
	Questions[currentQuestion].showMoreInfo();
	communicate("Correct!/Incorrect");
});
$("#next").click(function(){
	Questions[currentQuestion].hideMoreInfo();
	currentQuestion++;
	Questions[currentQuestion].displayQuestion();

});



});