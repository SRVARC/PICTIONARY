var firebaseConfig = {
    apiKey: "AIzaSyAPnL_jdH3IrBe89Wby8KB9hqagCaGmp7Y",
    authDomain: "pictionary-d48a3.firebaseapp.com",
    databaseURL:"https://pictionary-d48a3-default-rtdb.firebaseio.com/",
    projectId: "pictionary-d48a3",
    storageBucket: "pictionary-d48a3.appspot.com",
    messagingSenderId: "479484819647",
    appId: "1:479484819647:web:17748693cf6e2e3e666e0a"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room Name -" + Room_names);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
   document.getElementById("output").innerHTML += row;

   //End code
   });});}
getData();


function addRoom()
{
   room_name = document.getElementById("room_name").value;

   firebase.database().ref("/").child(room_name).update({
         purpose : "adding room name"
   });

   localStorage.setItem("room_name" , room_name);
   window.location = "game_page.html";
}

function redirectToRoomName(name)
{
   console.log(name);
   localStorage.setItem("room_name", name);
   window.location = "game_page.html";
}




function logout()
{
   localStorage.removeItem("user_name");
   localStorage.removeItem("room_name");
   window.location = "game.html";
}
