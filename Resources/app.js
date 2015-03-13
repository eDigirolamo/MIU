// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var margin = 15;

var myData = require("JSON");
var basic = myData.myData.basic;
var additional = myData.myData.additional;

// windows
var mainWin = Ti.UI.createWindow({
		title: "About Me",
});
var detailWin = Ti.UI.createWindow({
	backgroundColor: "#1976D2",
	exitOnBack: true
		
});
var navWin = Ti.UI.iOS.createNavigationWindow({
	window: mainWin,
	backgroundColor: "#039BE5"
});

// table
var aboutMeTable = Ti.UI.createTableView({
			backgroundColor: "#40C4FF"

});
// table sections
var basicQuestions = Ti.UI.createTableViewSection({

headerTitle: "Basic Questions"	
});
var additionalQuestions = Ti.UI.createTableViewSection({
	headerTitle: "Additional Questions"	

});

// groups sections together to simplify adding data to table
var questions = [basicQuestions, additionalQuestions];

// Loops through basic questions to populate section 1
for (n in basic){

	var basicRow = Ti.UI.createTableViewRow({
		backgroundColor: "#FAFAFA",
	    color: "#000",
		title: basic[n].title,
		answer: basic[n].answer,
		position: basic[n].position
	});
		
basicQuestions.add(basicRow);

}

// Loops through additional questions making section 2 populate questions
for (n in additional){
	var additionalRow = Ti.UI.createTableViewRow({
		backgroundColor: "#FAFAFA",
	    color: "#000",
		title: additional[n].title,
		answer: additional[n].answer,
		position: additional[n].position,
	});

additionalQuestions.add(additionalRow);

}

aboutMeTable.setData(questions);

// Event propogation to minimize click listeners and speed up app!
aboutMeTable.addEventListener("click", function(event){
	var question = event.source.title;
	var answer = event.source.answer;
	var position = event.source.position;

	myAnswer(question, answer, position);
console.log(event.source.position);
	

});

// builds detail window from json data
var myAnswer = function(question, answer, number){
	
	detailWin.title = "Question " + number;
	var ques = Ti.UI.createLabel({
		top: 45,
		left: margin,
		right: margin,
		text:"question",
		color: "#fff",
		font: {fontSize: 20, fontFamily: "Arial"},

	});
	
	var answ = Ti.UI.createLabel({
		top: ques.top +150,
		left: margin,
		right: margin,
		text: "answer",
		color: "#fff",
		font: {fontSize: 20, fontFamily: "Arial"},

	});

	detailWin.add(ques, answ);
	ques.text = "Question:\n\n" + question;
	answ.text = "Answer:\n\n" +answer;
	
	
navWin.openWindow(detailWin);	

// without this my question would overlap one another after selevting back and then another question
detailWin.addEventListener('close', function(){
	detailWin.removeAllChildren();
});

};


// Open Window
mainWin.add(aboutMeTable);
navWin.open();
