<?php
	include 'connection.php';
	
	$request = $_REQUEST; //a PHP Super Global variable which used to collect data after submitting it from the form
	$id = $_REQUEST['employee_id']; //employee ID we are using it to get the employee record

	// Set the DELETE SQL data
	$sql = "CALL deleteuser('".$id."')";
	// Process the query so that we will save the date of birth
	if ($mysqli->query($sql)) {
	  echo "Employee has been successfully deleted.";
	} else {
	  echo "Error: " . $sql . "<br>" . $mysqli->error;
	}

	// Close the connection after using it
	$mysqli->close();
?>