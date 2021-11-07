$(document).ready(function () {

});


function Acessar(ele) {
    loading(ele);
    $('#display-erro').hide();
    $('#btn-acessar').attr('disabled', true);
    let obj = {
        usuario: $('#login').val(),
        senha: $('#senha').val()
    };
    LoginLogar(obj).then(function () {
        unloading(ele);
        window.location.href = '/home';
    }, function (err) {
        unloading(ele);
        $('#alert-erro').html(err);
        $('#display-erro').show();
        $('#btn-acessar').attr('disabled', false);
    });
}