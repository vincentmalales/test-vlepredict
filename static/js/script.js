function get_all() 
{
	// Ajax config
	$.ajax({
        type: "GET", //we are using GET method to get all record from the server
        url: 'php/all.php', // get the route value
        success: function (response) {//once the request successfully process to the server side it will return result here
            
            // Parse the json result
        	response = JSON.parse(response);

            var html = "";
            // Check if there is available records
            if(response.length) {
	            
	            $.each(response, function(key,value) {
	            	// Our employee list template
					html += "<tr>";
					html += "<td scope='col'>" + value.firstname + "</td>";
					html += "<td scope='col'>" + value.lastname + "</td>";
					html += "<td scope='col'>" + value.gender + "</td>";
					html += "<td scope='col'>" + value.age + "</td>";
					html += "<td scope='col'>" + value.nationality + "</td>";
					html += "<td scope='col'>" + value.nationality + "</td>";
					html += "<td scope='col'>" + value.nationality + "</td>";
					html += "<td scope='col'>" + value.nationality + "</td>";
					html += "<td scope='col'>" + value.nationality + "</td>";
					html += '<td scope="col">' + "<button class='btn btn-sm btn-primary mt-2' data-toggle='modal' data-target='#edit-employee-modal' data-id='"+value.id+"' id='update'>" + "Edit" + "</button>" + " " +
					"<button class='btn btn-sm btn-danger mt-2 ml-2 btn-delete-employee' data-id='"+value.id+"' type='button'>" + "Delete" + "</button>" + "</td>";
					html += "</tr>";
	            });
	            
            } 
            // Insert the HTML Template and display all employee records
			$("#tabentries2 tbody").html(html);
        }
    });
}

function save() 
{
	$("#btnSubmit").on("click", function() {
		var $this 		    = $(this); //submit button selector using ID
        var $caption        = $this.html();// We store the html content of the submit button
        var form 			= "#form"; //defined the #form ID
        var formData        = $(form).serializeArray(); //serialize the form into array
        var route 			= $(form).attr('action'); //get the route using attribute action

        // Ajax config
    	$.ajax({
	        type: "POST", //we are using POST method to submit the data to the server side
	        url: 'php/save.php', // get the route value
	        data: formData, // our serialized array data for server side
	        beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
				$this.attr('disabled', true).html("Processing...");

	        },
	        success: function (response) {//once the request successfully process to the server side it will return result here
	            $this.attr('disabled', false).html($caption);

	            // Reload lists of employees
	            get_all();

	            // We will display the result using alert
	            alert(response);

	            // Reset form
	            resetForm(form);
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        	// You can put something here if there is an error from submitted request
	        }
	    });
	});
}

function resetForm(selector) 
{
	$(selector)[0].reset();
}





function update() 
{
	$("#btnUpdateSubmit").on("click", function() {
		var $this 		    = $(this); //submit button selector using ID
        var $caption        = $this.html();// We store the html content of the submit button
        var form 			= "#edit-form"; //defined the #form ID
        var formData        = $(form).serializeArray(); //serialize the form into array
        var route 			= $(form).attr('action'); //get the route using attribute action

        // Ajax config
    	$.ajax({
	        type: "POST", //we are using POST method to submit the data to the server side
	        url: 'php/update.php', // get the route value
	        data: formData, // our serialized array data for server side
	        beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
	            $this.attr('disabled', true).html("Processing...");
	        },
	        success: function (response) {//once the request successfully process to the server side it will return result here
	            $this.attr('disabled', false).html($caption);

	            // Reload lists of employees
	            get_all();

	            // We will display the result using alert
	            alert(response);
				
	            // Reset form
	            resetForm(form);

	            // Close modal
	            $('#edit-modal').modal('toggle');
				
				window.location.href = "index.html";
                //////////////insert loading main page here
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        }
	    });
	});
}


function del() 
{
	$(document).delegate(".btn-delete-employee", "click", function() {
		    var employeeId = $(this).attr('data-id');
		    // Ajax config
			$.ajax({
		        type: "GET", //we are using GET method to get data from server side
		        url: 'php/delete.php', // get the route value
		        data: {employee_id:employeeId}, //set data
		        beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
		        },
		        success: function (response) {//once the request successfully process to the server side it will return result here
		            // Reload lists of employees
	            	get_all();
		        }
		    });		
	});
	
}

var Userdata = []; // Initialize an empty array to store the data

  function generateData() {
    var firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
    var lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Wilson", "Anderson"];
    var genders = ["Male", "Female"];
    var educations = ["High School", "Bachelor's Degree", "Master's Degree", "PhD"];
    var deprivationBands = ["Band 1", "Band 2", "Band 3" , "Band 4", "Band 5", "Band 6", "Band 7", "Band 8", "Band 9", "Band 10"];
    var disabilities = ["Yes", "No"];
    var interventions = ["Needs Intervention", "No Intervention Needed"];
    var statuses = ["critical", "safe"]

    // Check if data already exists in sessionStorage
    var storedData = sessionStorage.getItem('generatedData');

    var uniqueId = generateUniqueId();
    for (var i = 1; i <= 5; i++) {
      var row = {
        id: uniqueId,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        gender: genders[Math.floor(Math.random() * genders.length)],
        age: Math.floor(Math.random() * 50) + 20, // Random age between 20 and 69
        education: educations[Math.floor(Math.random() * educations.length)],
        deprivationBand: deprivationBands[Math.floor(Math.random() * deprivationBands.length)],
        unitsEnrolled: Math.floor(Math.random() * 60) + 30, // Random units between 1 and 10
        disability: disabilities[Math.floor(Math.random() * disabilities.length)],
        average: [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)  
        ],
        engagement: [ Math.floor(Math.random() * 400), Math.floor(Math.random() * 400), Math.floor(Math.random() * 400), Math.floor(Math.random() * 400), Math.floor(Math.random() * 400)], 
        intervention: interventions[Math.floor(Math.random() * interventions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      };

      Userdata.push(row); // Add each row to the data array
    }

    // Store the updated data in sessionStorage
    sessionStorage.setItem('generatedData', JSON.stringify(Userdata));

    updateTable();
    
  }

  function clearData() {
    Userdata = []; // Clear the data array
    sessionStorage.removeItem('generatedData'); // Remove the data from sessionStorage
    updateTable();
  }

  function updateTable() {
    var tableBody = document.getElementById('tableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through the data and create table rows dynamically
    for (var j = 0; j < Userdata.length; j++) {
      var row = document.createElement('tr');

      var cell1 = document.createElement('td');
      cell1.innerHTML = Userdata[j].firstName;
      row.appendChild(cell1);

      var cell2 = document.createElement('td');
      cell2.innerHTML = Userdata[j].lastName;
      row.appendChild(cell2);

      var cell3 = document.createElement('td');
      cell3.innerHTML = Userdata[j].gender;
      row.appendChild(cell3);

      var cell4 = document.createElement('td');
      cell4.innerHTML = Userdata[j].age;
      row.appendChild(cell4);

      var cell5 = document.createElement('td');
      cell5.innerHTML = Userdata[j].education;
      row.appendChild(cell5);

      var cell6 = document.createElement('td');
      cell6.innerHTML = Userdata[j].deprivationBand;
      row.appendChild(cell6);

      var cell7 = document.createElement('td');
      cell7.innerHTML = Userdata[j].unitsEnrolled;
      row.appendChild(cell7);

      var cell8 = document.createElement('td');
      cell8.innerHTML = Userdata[j].disability;
      row.appendChild(cell8);

      var cell9 = document.createElement('td');
      cell9.innerHTML = Userdata[j].intervention;
      row.appendChild(cell9);

      tableBody.appendChild(row);
    }
  }

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Attach event listeners to the buttons
  var generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generateData);

  var clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', clearData);

  // Retrieve data from sessionStorage on page load
  var storedData = sessionStorage.getItem('generatedData');
  if (storedData) {
    Userdata = JSON.parse(storedData);
    updateTable();
  }

  var categoryCounts = {
    firstName: {},
    lastName: {},
    gender: {},
    age: {},
    education: {},
    deprivationBand: {},
    unitsEnrolled: {},
    disability: {}
  };
  

  

$(document).ready(function() {

	save();
	get();
	update();
	del();
	get_all();
	
});

