/* Card.js plugin by Jesse Pollak. https://github.com/jessepollak/card */

$('form').card({
    container: '.card-wrapper',
    width: 20%,

    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
});

$('document').ready(function savePayment()
{
    alert("Payment has been saved successfully");
    return true
}