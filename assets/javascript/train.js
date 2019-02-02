// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAR_pTkRSgsWo5VOZ-dOlxcbvHeAIzqKDw",
    authDomain: "schedule-64179.firebaseapp.com",
    databaseURL: "https://schedule-64179.firebaseio.com",
    projectId: "schedule-64179",
    storageBucket: "schedule-64179.appspot.com",
    messagingSenderId: "237034074840"
  };
  firebase.initializeApp(config);

//variable to store the database
var database = firebase.database();
console.log(database);

//onclick event when the submit button is clicked
$("#submit").on("click", function(event){
    //keep the page from refreshing
    event.preventDefault();
    //create variables to store the values of each input from the form 
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var trainTime = $("#trainTime").val();
    var frequency = $("#frequency").val();
    //below values are calculated, not entered by the user
    var nextArrival = "???";
    var minsAway = "???";

    //add the stored values to the linked Firebase database 
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    });
    console.log(database);

    //create the table with the information
   
    var $row = $("<tr>");
    $row.append("<td>" + trainName + "</td>");
    $row.append("<td>" + destination + "</td>");
    $row.append("<td>" + trainTime + "</td>");
    $row.append("<td>" + frequency + "</td>");
    $row.append("<td>" + nextArrival + "</td>");
    $row.append("<td>" + minsAway + "</td>");

    // append the table rows to the tbody
    $('tbody').append($row);

    //read a snapshot from the database
    //activated with a new addition submitted by the user
    database.ref().on("child_added", function(snapshot){
        console.log(snapshot.val());
        var value = snapshot.val();
        var trainName = value.trainName;
        var destination = value.destination; 
        var trainTime = value.trainTime;
        var frequency = value.frequency;

    //create another table with these additions when there are new submissions

    var $row = $("<tr>");
    $row.append("<td>" + trainName + "</td>");
    $row.append("<td>" + destination + "</td>");
    $row.append("<td>" + trainTime + "</td>");
    $row.append("<td>" + frequency + "</td>");
    $row.append("<td>" + nextArrival + "</td>");
    $row.append("<td>" + minsAway + "</td>");
    
    // append the table rows to the tbody
    $('tbody').append($row);

    });

    //calculate next arrival and minutes away using moment

    


});
