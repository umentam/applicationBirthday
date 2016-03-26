window.onload = function(){


};

$("#input-button").click(function(){
    savePayment();
});


function savePayment() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var cardNumber = $('#card-number').val();
    var expiryDate = $('#expiry-date').val();
    var cvv = $('#cvv').val();
    var streetAddress1 = $('#street-address1').val();
    var streetAddress2 = $('#street-address2').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var country = $('#country').val();
}