var loginUser = null;

firebase.auth().onAuthStateChanged(function (user) {

    loginUser = user;
    // authorization with user mail and password
    if (user) {
        // User is signed in.
        $(".login-cover").hide();
        var dialog = document.querySelector('#loginDialog');

        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.close();
    } else {

        $(".login-cover").show();
        // No user is signed in.
        var dialog = document.querySelector('#loginDialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
    }

    $("#loginProgress").hide();
    $("#loginBtn").show();
});

var userIDs = [];
var urlb;
/* LOGIN PROCESS */
$("#loginBtn").click(
    function () {
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        if (email != "" && password != "") {
            $("#loginProgress").show();
            $("#loginBtn").hide();
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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

$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("YES");
        } else {
            // No user is signed in
            console.log("NO");
        }
    });

    var rootRef = firebase.database().ref("Items").orderByChild("Category").equalTo("VEHICLES");
    rootRef.on("child_added", (snap) => {
        userIDs.push(snap.key);
        var name = snap.child("Name").val();
        var licensePlate = snap.child("LicensePlate").val();
        var user = snap.child("User").val();
        var approved = snap.child("Approved").val();
        var picture = snap.child("MainPicture").val();

        var template = $('#pictureItemTemplate').html();
        $.template('pictureItemTemplate', template);
        $.tmpl( "pictureItemTemplate", {'Id': 'checkbox-' + new Date().getTime()
            ,'Name': name, 'License': licensePlate
            , 'User' : user, 'Picture': picture} ).appendTo($("#items tbody"));

        //$("#picture-table tbody").append(_newRow);
        componentHandler.upgradeAllRegistered();


        var storage = firebase.storage();
        var httpsReference = storage.refFromURL(picture);


        httpsReference.getDownloadURL().then(function (url) {


        }).catch(function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    console.log("unauthorized")
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;


                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
            // Handle any errors
        });

    });
});

function resizeImg(img, height, width) {
    img.height = height;
    img.width = width;
}

// Write to Firebase

function start() {

    canvas.width = 100;
    canvas.height = 100;

    var w = img.width;
    var h = img.height;

    // resize img to fit in the canvas
    // You can alternately request img to fit into any specified width/height
    var sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);
}


function buttonClick(x) {
    console.log(userIDs[x.parentNode.rowIndex - 1]);
    var firebaseRef = firebase.database().ref().child("Items").child(userIDs[x.parentNode.rowIndex - 1])
    firebaseRef.update({Approved: true}).then(function (resolve, error) {
        console.log(error);

    })
}

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
        firebaseRef.update({Approved: false, Reason: reason}).then(function (resolve, error) {
            console.log(error);
        })


    }
}

/* LOGOUT PROCESS */

$("#signOutBtn").click(
    function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            alert(error.message);
        });
    }
);
