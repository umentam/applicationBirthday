Parse.initialize("1Nme1kGOwimbGs2cVfNS8wj2jpYnMUblNgdTQsl2", 'cvxX7RpSbkm2fPs19auYbgPPE0Y4bbVphqbohnHg');
//Parse.serverURL = 'http://localhost:1337/parse';

window.onload = function(){


};

$( "#btn-signup" ).click(function() {
    createUser();
});

function createUser(){
    var username = $('#username').val();
    var password = $('#pass').val();
    var password2 = $('#pass2').val();
    alert(username + " " + password + " " + password2);


    if(password == password2){
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password2);

        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                alert('yay');
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    else{
        alert("Error: " + "Passwords are not identical");
    }


}


//
//Parse.initialize("1Nme1kGOwimbGs2cVfNS8wj2jpYnMUblNgdTQsl2", "cvxX7RpSbkm2fPs19auYbgPPE0Y4bbVphqbohnHg");
////Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse'
//
//$(function(){
//
//// Create reference to username and password
//    var userName = $("input[name='user']");
//    var password = $("input[type='password']");
//
//// Call Click function on button to run when button is clicked
//    $('button[type="submit"]').click(function(e) {
//        e.preventDefault();
//
//        // Check if username and password is blank
//        Parse.User.logIn(userName.val(), password.val(), {
//
//            // function called if Log in was successful
//            success: function(user) {
//                // Do stuff after successful login.
//                //$("body").scrollTo("#output");
//                $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" +
//                    userName.val() + "</span>");
//                $("#output").removeClass(' alert-danger');
//                $("input").css({
//                    "height":"0",
//                    "padding":"0",
//                    "margin":"0",
//                    "opacity":"0"
//                });
//                //change button text
//                $('button[type="submit"]').html("continue")
//                    .removeClass("btn-info")
//                    .addClass("btn-default").click(function(){
//                    $("input").css({
//                        "height":"auto",
//                        "padding":"10px",
//                        "opacity":"1"
//                    }).val("");
//                });
//
//                //show avatar
//                //$(".avatar").css({
//                //    "background-image": "url('http://api.randomuser.me/0.3.2/portraits/women/35.jpg')"
//                //});
//
//
//            },
//            // Function called if log in failed
//            error: function(user, error) {
//                // The login failed. Check error to see why.
//                $("#output").removeClass(' alert alert-success');
//                $("#output").addClass("alert alert-danger animated fadeInUp").html("Username/Password Incorrect ");
//
//            }
//
//        }); // End of parse Login method
//
//
//    }); // End of click function
//
//}); // End of annoymous function
