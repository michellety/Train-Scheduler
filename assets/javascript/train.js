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
// console.log(database);

//onclick event when the submit button is clicked
$("#submit").on("click", function(event){
    //keep the page from refreshing
    event.preventDefault();
    //create variables to store the values of each input from the form 
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var trainTime = $("#trainTime").val().trim();
    
    //below values are calculated, not entered by the user
    var nextArrival = "";
    var minsAway = "";

    //add the stored values to the linked Firebase database 
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        nextArrival: nextArrival,
        minsAway: minsAway,
    });
    // console.log(database);

    
    //create the table with the information
   
    var $row = $("<tr>");
    $row.append("<td>" + trainName + "</td>");
    $row.append("<td>" + destination + "</td>");
    // $row.append("<td>" + trainTime + "</td>");
    $row.append("<td>" + frequency + "</td>");
    $row.append("<td>" + nextArrival + "</td>");
    $row.append("<td>" + minsAway + "</td>");

    // append the table rows to the tbody
    $("tbody").append($row);
});

    //read a snapshot from the database
    //activated with a new addition submitted by the user
    database.ref().on("child_added", function(snapshot){
        // console.log(snapshot.val());
        var value = snapshot.val();
        var trainName = value.trainName;
        var destination = value.destination; 
        var trainTime = value.trainTime;
        var frequency = value.frequency;

        // console.log("Train" + trainName);
        // console.log("dest" + destination);
        // console.log("firstTrainTime" + trainTime);
        // console.log("frequency" + frequency);

    //calculate next arrival and minutes away using moment.js

    //define the current time, and format to 24 hour military time 
    // var currentTime = moment().format("HH:mm");

    //subtract a year from the first train time so it is earlier than the current
    var editedTime = moment(trainTime, "HH:mm").subtract(1, "years");
    
    //calculate the difference between the first train time entered, and the current time  
    var timeDifference = moment().diff(moment(editedTime), "minutes");

    //calculate the remainder by the frequency
    var timeRemainder = timeDifference % frequency;

    //calculate minutess away by subtracting the remainder from how often the tain arrives
    var minsAway = frequency - timeRemainder;

    //calculate the next arrival by adding minutes away to the current time
    var nextArrival = moment().add(minsAway, "minutes").format("HH:mm");


    // create a table with these additions when there are new submissions
    var $row = $("<tr>");
    $row.append("<td>" + trainName + "</td>");
    $row.append("<td>" + destination + "</td>");
    $row.append("<td>" + frequency + "</td>");
    // $row.append("<td>" + trainTime + "</td>");
    
    $row.append("<td>" + nextArrival + "</td>");
    $row.append("<td>" + minsAway + "</td>");
    
    // append the table rows to the tbody
    $('tbody').append($row);

    });


