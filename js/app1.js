$(document).ready(function(){

//Declare global variables
var current = 0; //refers to the current Question object the user is on
var group;
var points = 0;
var answered = true; //variable to ensure questions are answered upon submission

// function to update user of what question they are on
var updateProgress = function(){
	$("#onNumber").text(current +1);
};
// function to tell user how many correct answers they have made
var updateScore = function(){
	$("#score_tracker").text(points);
};
//function to update the text in the communication bar of the Quiz
var communicate = function(message) {
	$("h2").text(message);
};

var hideMoreInfo = function() {
		$("div#options p").remove();
	};

// Prototype for each question object
function Question (picture, choices, answer, moreInfo) {
	this.picture= picture;
	this.choices= choices;
	this.answer = answer;
	this.moreInfo= moreInfo;
	
	//this will hide the old background image and display the new one
	// then it will ask the question, update and display the choices
	this.displayQuestion =function(){
		$("#background img").hide();
		this.picture.show();
		communicate("Where is this trail?");
		$("#option1").text(this.choices[0]);
		$("#option2").text(this.choices[1]);
		$("#option3").text(this.choices[2]);
		$("#currQ").show();
	};

	//this adds a "more-info" paragraph to the quiz after the question has been answered
	this.showMoreInfo= function(){
		$("#options").prepend("<p>"+this.moreInfo+"</p>");
	};
}

//Creating question objects
Q1 = new Question($("#huangshan"), ["Iceland", "China", "Brazil"], "2");
Q1.moreInfo = "Huangshan (Yellow Mountain) is one of China's holiest Mountains.";

Q2 = new Question($("#machu"),  ["Spain", "Nigeria", "Peru"], "3");
Q2.moreInfo = "This llama lives along the Inca Trail in the famous Machu Pichu, Peru.";

Q3 = new Question($("#mcafee"),  ["South Africa", "Switzerland", "America"], "3");
Q3.moreInfo = "McAfee Lookoff is along the Appalachian Trail in Virginia, USA.";

Q4 = new Question($("#maligne"),  ["Canada", "Turkey", "New Zealand"], "1");
Q4.moreInfo = "Maligne Lake is in Japser National Park, Canada.";

Q5 = new Question($("#nepal"), ["Morocco", "Chile", "Nepal"], "3");
Q5.moreInfo = "These hikers snapped this photo doing the Poon Hill trek in Nepal!";

//Store question objects in an array
var Questions = [Q1, Q2, Q3, Q4, Q5];

//this function evaluates the guess to make sure the question has been anwered and checks if it is correct
var evaluateGuess= function () {
	var uncheckedRadioButtons = 0;
	var group= $(".option"); //".option" finds the three radio buttons
	//use "for" loop to check each radio button
	for (var i = 0; i < group.length; i++) {
		//if this radio button has  been checked...
		if (group[i].checked === true) {
			answered = true; //the question has been answered
            var guess = group[i].value; //check to see if the answer is correct
			if(guess === Questions[current].answer) {
				communicate("Correct!");
				points++;
				updateScore();
			} else {
				communicate("Incorrect");
			}
		//if unchecked, count it as another unchecked button
		} else {
			uncheckedRadioButtons++;
			//check to see if all three radiobuttons are unchecked
			//if all three are unchecked, it means user didn't select an answer
			if(uncheckedRadioButtons === 3){
				answered = false;
				alert("You forgot to click an answer!");
			}
		}
	}
};

//Start of user interaction

//Pressing "start" displays first question 
$("#start").click(function(event){
	event.preventDefault();
	$("#start").hide();
	Questions[current].displayQuestion();
	updateProgress();
	});

//clicking "submit" evaluates the user response and gives more info
$("input:submit").click(function(event){
	event.preventDefault();
	evaluateGuess();
	if (answered === false){
		return false; //this stops quiz from proceeding until user has selected an answer
	}
	//hide questions and reset radio button
	$("#currQ").hide();
	$('input:radio').removeAttr('checked');
	//show more info and "next" button
	Questions[current].showMoreInfo();
	$("#next").show();
});

//clicking "next" advance user to the next question
$("#next").click(function(event){
	event.preventDefault();
	hideMoreInfo(); //hide previous Questions extra info
	$("#next").hide();
	current++;
	//check to see if user is has reached the end
	if (current === Questions.length) {
		//hide unneccessary items
		$("#currQ").hide();
		$("#background img").hide();
		$("#ongoing_quiz").hide();
		//show end of quiz results and info
		$("#start_image").show();
		communicate("You made it!");
		$("#end_quiz").show();
		$("#score_results").text(points);
	// If user is not at end, display next question	
	} else {
		updateProgress();
		communicate("Where is this trail?");
		Questions[current].displayQuestion();
		}

});


// function for quiz reset 
var reset = function(){
	//Hide everything that could have been displayed from the previous quiz session
	$("#background img").hide();
	hideMoreInfo();
	$("#next").hide();
	$('input:radio').removeAttr('checked');
	$("#currQ").hide();
	$("#end_quiz").hide();
	
	//Reset variables and update progress/scorebox
	current = 0;
	$("#onNumber").text("0");
	points = 0;
	updateScore();

	//Display picture and items needed for the starting state
	$("#start_image").show();
	communicate("Ready to go?");
	$("#start").show();
	$("#ongoing_quiz").show();
};

//reset quiz if "restart?" is clicked
$("#restart").click(function(event){
	event.preventDefault();
	reset();
});

//reset game if user clicks "play again" at end of game
$("#playagain").click(function(event){
	event.preventDefault();
	reset();
});


});

