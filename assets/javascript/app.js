 var config = {
    apiKey: "AIzaSyBWeQQfS5DT6-WG77E63BCl7CB5CKY1J7A",
    authDomain: "train-activity.firebaseapp.com",
    databaseURL: "https://train-activity.firebaseio.com",
    storageBucket: "train-activity.appspot.com",
    messagingSenderId: "623551891430"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$("#submitBtn").on("click", function(){

	var newName = $("#trainNameInput").val().trim();
	var newDestination = $("#trainDestinationInput").val().trim();
	var newFrequency = $("#frequencyInput").val().trim();
	var newStart = $("#firstTrainInput").val().trim();

	database.ref().push({
		name: newName,
		destination: newDestination,
		start: newStart,
		frequency: newFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	

	$("#trainNameInput").val(" ");
	$("#trainDestinationInput").val(" ");
	$("#frequencyInput").val(" ");
	$("#firstTrainInput").val(" ");

	return false;
});

database.ref().on("child_added", function(childSnapshot) {
	// var convertedDate = childSnapshot.val().start;

	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var start = childSnapshot.val().start;
	var frequency = childSnapshot.val().frequency;


	var newTr = $("<tr>");

	var newTrainTd = $("<td>");
	var newDestinationTd = $("<td>");
	var newFirstTrainTd = $("<td>");
	var newFrequencyTd = $("<td>");
	var newNextTd = $("<td>");
	var newMinutesAwayTd = $("<td>");

	// var frequency2 = 20;
	// var start2 = "16:30";

	var firstTimeConverted = moment(start,"hh:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff2 = moment().diff(firstTimeConverted, "minutes");
	var timeRemainder = timeDiff2 % frequency;
	var minutesNextTrain = frequency - timeRemainder;
	var nextTrain = moment().add(minutesNextTrain, "minutes").format("hh:mm");
	// console.log()

	newTrainTd.text(name);
	newDestinationTd.text(destination);
	newFirstTrainTd.text(start);
	newFrequencyTd.text(frequency);
	newNextTd.text(nextTrain);
	newMinutesAwayTd.text(minutesNextTrain);



	newTr.append(newTrainTd, newDestinationTd, newFirstTrainTd, newFrequencyTd, newNextTd, newMinutesAwayTd);
	$(".tbody").append(newTr);

});