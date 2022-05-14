firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    /*
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    */
    dialog.close();

  } else {

    $(".login-cover").show();

    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});

var userIDs = [];
var urlb;

/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);

/* Retrieve Data */

$(document).ready(function(){

      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       console.log("YES");
      } else {
      // No user is signed in
      console.log("NO");
      }
      });

      var rootRef = firebase.database().ref("Items").orderByChild("Category").equalTo("VEHICLES");
      rootRef.on("child_added", snap => {

      userIDs.push(snap.key);
      console.log(snap.key);

      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      //var storageRef = storage.ref();


      var name = snap.child("Name").val();
      var licensePlate = snap.child("LicensePlate").val();
      var user = snap.child("User").val();
      var approved = snap.child("Approved").val();
      var picture = snap.child("MainPicture").val();


      //var nuroImage = new Image;
      // var request = new XMLHttpRequest();
      // request.responseType = "blob";
      // request.onload = function() {
      //   picture = URL.createObjectURL(this.response)
      // }
      // request.open("GET", picture);
      // request.send();




      var img = '<img src=' + picture + 'alt="User vehicles" width="100" height="100"></img>';
        //console.log(img);

      //  var img = document.createElement('img');
      // //
      //  img.src = picture;
      //
      // button.id = 'approveButton';

    //  var output = document.getElementById("js-output");
      var approveButton = '<button id="buttonHTML" onClick="buttonCllick(this)">approve</button>';

      var declineButton = '<button id="buttonHTML" onClick="buttonCllick(this)">decline</button>';
    //  output.innerHTML = htmlButton + output.innerHTML;
    //  document.getElementById("button" + (index++)).addEventListener("click", function() {
    //  alert("button clicked");

      if (approved) {
        $("#table_body").append("<tr><td>" + name + "</td><td>" + licensePlate +
                                "</td><td>"+ user + "</td><td>" + img +
                                "</td><td>"+ approved + "</td></tr>");
      }

  });

});

// Write to Firebase





function declineBUtton(x) {
    var txt;
    var reason = prompt("What's the reason:", "Your car is wack.");
    if (reason == null || reason == "") {
        txt = "User cancelled the prompt.";
        console.log(txt);
    } else {
      console.log(reason);
      console.log(userIDs[x.parentNode.rowIndex - 1]);
      var firebaseRef = firebase.database().ref().child("Items").child(userIDs[x.parentNode.rowIndex - 1])
      firebaseRef.update({Approved : false, Reason: reason}).then(function(resolve, error){
      console.log(error);
      })


    }
}

/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);
