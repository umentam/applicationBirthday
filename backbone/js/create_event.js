Parse.initialize("1Nme1kGOwimbGs2cVfNS8wj2jpYnMUblNgdTQsl2", 'cvxX7RpSbkm2fPs19auYbgPPE0Y4bbVphqbohnHg');
//Parse.serverURL = 'http://localhost:1337/parse';

window.onload = function(){

};

$( "#submit" ).click(function(e) {
    e.preventDefault();
    createEvent();
});

function createEvent() {
    //eventName location birthDate description eventDate goal charity


    var Event = new Parse.Object.extend("Event")
    var event = new Event();



    var location = $('#location').val();
    var eventName = $('#eventName').val();
    var birthDate = $('#birthDate').val();
    var description = $('#description').val();
    var eventDate = $('#eventDate').val();
    var goal = $('#goal').val();
    var charity = $('#charity').val();


    alert(location);
    event.set("location", location);
    event.set("description", description);
    event.set("birthday", birthDate);
    event.set("goal", goal);
    event.set("charity", charity);
    event.set("name", eventName);
    event.set("user", Parse.User.current());

    event.save(null, {
        success: function(item) {
            //Success Callback
            window.location.replace("/event.html");
        },
        error: function(gameScore, error) {
            //Failure Callback
            alert("Error: " + error.code + " " + error.message);
        }
    });
}