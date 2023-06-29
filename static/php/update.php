<?php
	include 'connection.php';
	
	$request = $_REQUEST; //a PHP Super Global variable which used to collect data after submitting it from the form
	$id = $_POST['id'];
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];
	$age = $_POST['age'];
	$gender = $_POST['gender'];
	$temp = $_POST['temp'];
	$mobile_no = $_POST['mobile_no'];
	$covid_diag = $_POST['covid_diag'];
	$covid_encntr = $_POST['covid_encntr'];
	$vacc = $_POST['vacc'];
	$nationality = $_POST['nationality'];


	if(strlen($first_name)==0 || strlen($last_name)==0 || strlen($age)==0 || strlen($temp)==0 || strlen($mobile_no)==0 
		|| $gender== "" || $covid_diag== "" || $covid_encntr== "" || $vacc== "" || $nationality== "" || !is_numeric($age) || !is_numeric($mobile_no) || !is_numeric($temp)){
			die("Please provide values to the field correctly.");
	}else{
		$sql = "CALL updateuser('" . $id ."','" . $first_name ."', '" . $last_name ."', '" . $gender ."', '" . $age ."', '" . $mobile_no ."', '" . $temp ."',
		'" . $covid_diag ."', '" . $covid_encntr ."', '" . $vacc ."', '" . $nationality ."')";
	}
	// Process the query so that we will save the date of birth
	if ($mysqli->query($sql)) {
	  echo "User has been sucessfully updated.";
	} else {
	  echo "Error: " . $sql . "<br>" . $mysqli->error;
	}

	// Close the connection after using it
	$mysqli->close();
?>