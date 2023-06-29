<?php
	
	include 'connection.php';
    $sql = "CALL count_minor()";
	// Process the query so that we will save the date of birth
	$results = $mysqli->query($sql);
	// Close the connection after using it
	$row = $results->fetch_array();
	// Free result set
	$results->free_result();
	$mysqli->close();
    echo json_encode($row);
?>