<?php
	include 'connection.php';

	// Set the INSERT SQL data
	$sql = "SELECT * FROM covid_user";

	// Process the query so that we will save the date of birth
	$results = $mysqli->query($sql);

	// Fetch Associative array
	$row = $results->fetch_all(MYSQLI_ASSOC);

	// Free result set
	$results->free_result();

	// Close the connection after using it
	$mysqli->close();

	echo json_encode($row);
?>