<!DOCTYPE html>
<html lang="en">
<head>
	<title></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
		 integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="jumbotron">
				<h1>Employee Management!!</h1>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title"> Current List of Employees</h3>
					</div>
					<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th>Employee Name</th>
									<th>Role</th>
									<th>Start Date</th>
									<th>Months Worked</th>
									<th>Monthly Rate ($)</th>
									<th>Total Billed ($)</th>
								</tr>
							</thead>
							<tbody class="tbody">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title"> Add Employee</h3>
					</div>

					<div class="panel-body">
						<form>
							<div class="form-group">
								<label for="employeeNameInput">Employee Name</label>
								<input type="text" placeholder="ex: Ryan House" class="form-control" id="employeeNameInput">
							</div>
							<div class="form-group">
								<label for="employeeRoleInput">Role</label>
								<input type="text" placeholder="ex: CEO or Technician" class="form-control" id="employeeRoleInput">
							</div>
							<div class="form-group">
								<label for="employeeStartInput">Start Date (DD/MM/YYYY)</label>
								<input type="date" placeholder="ex: Jan 06, 2005 = 06/01/2005" class="form-control" id="employeeStartInput">
							</div>
							<div class="form-group">
								<label for="employeeRateInput">Monthly Rate</label>
								<input type="number" placeholder="ex: 123 = $123 per Month" class="form-control" id="employeeRateInput">
							</div>
							<button type="submit" class="btn btn-default" id="submitBtn">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>




	</div>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.2/moment.min.js"></script>

<script>
  // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBWeQQfS5DT6-WG77E63BCl7CB5CKY1J7A",
    authDomain: "train-activity.firebaseapp.com",
    databaseURL: "https://train-activity.firebaseio.com",
    storageBucket: "train-activity.appspot.com",
    messagingSenderId: "623551891430"
  };
  firebase.initializeApp(config);

$("#submitBtn").on("click", function(){

	var newName = $("#employeeNameInput").val().trim();
	var newRole = $("#employeeRoleInput").val().trim();
	var newStart = $("#employeeStartInput").val().trim();
	var newRate = $("#employeeRateInput").val().trim();

	database.ref().push({
		name: newName,
		role: newRole,
		start: newStart,
		rate: newRate,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	

	$("#employeeNameInput").val(" ");
	$("#employeeRoleInput").val(" ");
	$("#employeeStartInput").val(" ");
	$("#employeeRateInput").val(" ");

	return false;
});

database.ref().on("child_added", function(childSnapshot) {
	var convertedDate = childSnapshot.val().start;

	var name = childSnapshot.val().name;
	var role = childSnapshot.val().role;
	var start = moment(convertedDate).format("MMM Do YYYY");
	var rate = childSnapshot.val().rate;

	var months = moment().diff(convertedDate, "months");

	console.log(name);
	console.log(role);
	console.log(start);
	console.log(rate);


		var newTr = $("<tr>");

		var newEmpTd = $("<td>");
		var newRoleTd = $("<td>");
		var newStartTd = $("<td>");
		var newMonthTd = $("<td>");
		var newRateTd = $("<td>");
		var newBilledTd = $("<td>");

		newEmpTd.text(name);
		newRoleTd.text(role);
		newStartTd.text(start);
		newRateTd.text("$" + rate);

		newMonthTd.text(months);
		newBilledTd.text("$" + (months * rate));


		newTr.append(newEmpTd, newRoleTd, newStartTd, newMonthTd, newRateTd, newBilledTd);
		$(".tbody").append(newTr);

});

</script>
</body>
</html>