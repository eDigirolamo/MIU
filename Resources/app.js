// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var myData = require("JSON");
var basic = myData.myData.basic;
var additional = myData.myData.additional;
// windows
var mainWin = Ti.UI.createWindow({
		title: "About Me",
});


var navWin = Ti.UI.iOS.createNavigationWindow({
	window: mainWin,
});

// table
var aboutMeTable = Ti.UI.createTableView({
			backgroundColor: "#2979FF"

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
		backgroundColor: "#fff",
	    color: "#000",
		title: basic[n].title,
		answer: basic[n].answer
	});
		
basicQuestions.add(basicRow);

}

// Loops through additional questions making section 2 populate questions
for (n in additional){
	var additionalRow = Ti.UI.createTableViewRow({
		backgroundColor: "#fff",
	    color: "#000",
		title: additional[n].title,
		answer: additional[n].answer
	});
	
additionalQuestions.add(additionalRow);

}



aboutMeTable.setData(questions);
// Event propogation to minimize click listeners and speed up app!
aboutMeTable.addEventListener("click", function(event){

});
mainWin.add(aboutMeTable);
navWin.open();
