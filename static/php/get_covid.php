<?php
	
	include 'connection.php';
	$request = $_REQUEST; //a PHP Super Global variable which used to collect data after submitting it from the form
	$count_covid = "Yes";
	// Set the UPDATE SQL data
    $sql = "CALL count_covid('".$count_covid."')";
	// Process the query so that we will save the date of birth
	$results = $mysqli->query($sql);
	// Close the connection after using it
	$row = $results->fetch_array();
	// Free result set
	$results->free_result();
	$mysqli->close();
    echo json_encode($row);
?>