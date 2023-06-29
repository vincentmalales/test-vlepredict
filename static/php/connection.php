<?php
   $dbhost = "localhost"; //set the servername
   $username = "root"; //set the server username
   $password = ""; // set the server password (you must put password here if your using live server)
   $dbname = "covid_dashboard"; // set the table name

   $mysqli = new mysqli($dbhost, $username, $password, $dbname);

   if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
  }

?>