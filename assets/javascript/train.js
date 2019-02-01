// Initialize Firebase

  var config = {
    apiKey: "AIzaSyAlgH9LdQzoVRU8HP22ViqZx_RCz-7MurQ",
    authDomain: "train-schedule-hw-e720e.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-e720e.firebaseio.com",
    projectId: "train-schedule-hw-e720e",
    storageBucket: "train-schedule-hw-e720e.appspot.com",
    messagingSenderId: "571375263346"
  };
  firebase.initializeApp(config);

//variable to store the database
var database = firebase.database();

//onclick event when the submit button is clicked
$("#submit").on("click", function(event){
    //keep the page from refreshing
    event.preventDefault();
    //create variables to store the values of each input from the form 

    //add the stored values to the linked Firebase database 

    //create the table with the information

    // append the table rows to the tbody

    //read a snapshot from the database

    //calculate next arrival and minutes away using moment

    //create another table with these additions when there are new submissions
    


})
