Parse.initialize("1Nme1kGOwimbGs2cVfNS8wj2jpYnMUblNgdTQsl2", 'cvxX7RpSbkm2fPs19auYbgPPE0Y4bbVphqbohnHg');
//Parse.serverURL = 'http://localhost:1337/parse';

window.onload = function(){


};

$( "#submit" ).click(function() {
    createEvent();
});

function createEvent() {
    //eventName location birthDate description eventDate goal charity
    var location = $('#location').val();
    var eventName = $('#eventName').val();
    var birthDate = $('#birthDate').val();
    var description = $('#description').val();
    var eventDate = $('#eventDate').val();
    var goal = $('#goal').val();
    var charity = $('#charity').val();


    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);

    user.signUp(null, {
        success: function (user) {
            // Hooray! Let them use the app now.
            alert('yay');
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}