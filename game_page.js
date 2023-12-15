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

room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];
      name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      like_button = "<button class='btn btn-warning' id="+ firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
      span_with_tag = "<span class= 'glyphicon glyphicon-thumb-up'>Like: "+like + "</span></button><hr>";

      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;


//End code
 } });  }); }
getData();


function send()
{
 msg = document.getElementById("msg").value;
 firebase.database().ref(room_name).push({
       name:user_name,
       message:msg,
       like:0
 });

 document.getElementById("msg").value = "";
}

function logout()
{
 localStorage.removeItem("user_name");
 localStorage.removeItem("room_name");
 window.location = "game.html";
}

function updateLike(message_id)
{
 console.log("clicked on like button -" + message_id);
 button_id = message_id;
 likes = document.getElementById(button_id).value;
 updated_likes = Number(likes) + 1;
 console.log(updated_likes);

 firebase.database().ref(room_name).child(message_id).update({
       like : updateLike
 });
}


canvas = document.getElementById('myCanvas');
 ctx = canvas.getContext("2d"); 
 color = "black";
 width_of_line = 1;

 canvas.addEventListener("mousedown", my_mousedown);

 function my_mousedown(e)
 {
    color = document.getElementById("color").value;
    width_of_line = document.getElementById("width_of_line").value;
    mouseEvent = "mouseDown";
 }


 canvas.addEventListener("mouseleave" , my_mouseleave);

 function my_mouseleave (e)
 {
    mouseEvent  = "mouseleave" ; 
 }


 canvas.addEventListener("mouseup" , my_mouseup);

 function my_mouseup (e)
 {
    mouseEvent  = "mouseUP" ; 
 }




 canvas.addEventListener("mousemove" , my_mousemove);

 function my_mousemove (e)
 {
    current_position_of_mouse_x = e.clientX - canvas.offsetLeft;
    current_position_of_mouse_y = e.clientY - canvas.offsetTop;


     if ( mouseEvent == "mouseDown")  {

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width_of_line;


        console.log("Last position of x and y coordinates = ");
        console.log( "x =" + last_position_of_x + "y = " +  last_position_of_y );
        ctx.moveTo(last_position_of_x , last_position_of_y);


        console.log("Current  position of x and y coordinates = ");
        console.log( "x =" + current_position_of_mouse_x + "y = " +  current_position_of_mouse_y );
        ctx.lineTo(current_position_of_mouse_x , current_position_of_mouse_y);
        ctx.stroke();
    }


    last_position_of_x = current_position_of_mouse_x;
    last_position_of_y = current_position_of_mouse_y;
 }
