grecaptcha.ready(function () {
    grecaptcha.execute('6Lew1pIUAAAAABYx6P6CqXBAopdORA0KH0n1jbPf', { action: 'homepage' }).then(function (token) {
        document.getElementById('g-recaptcha-response').value = token
    });
});

function getCaptcha(secretKey) {
    $.post('phppage.php', { url: url }, function (data) {
        document.getElementById('somediv').innerHTML = data;
    });
}