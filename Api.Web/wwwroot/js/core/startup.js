$(document).ready(function () {
    VerificaAmbienteHomologacao();
    VerificaToken();
    Mascaras();
});

function ToolTips() {
    if (GetCookie('lang') === 'pt_PT' || parseInt(GetCookie('tipo-usuario')) !== 4) {
        $('[data-toggle="tooltip"]').tooltip('hide');
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
        }, 500);
    } else {
        $('[data-toggle="tooltip"]').tooltip('hide');
    }
}

function VerificaAmbienteHomologacao() {
    if (IsDebug()) {
        $('#aviso-ambiente-homologacao').show();
        $('#aviso-ambiente-homologacao-small').show();
    }
}

function VerificaToken() {
    if (window.location.pathname.toLocaleLowerCase() !== '/') {
        UsuarioAutenticado().then(function (usuario) {
            if (!usuario) {
                DeleteAllCookies();
                window.location.href = '/';
            }
        }, function (err) {
            DeleteAllCookies();
            console.error(err);
            window.location.href = '/';
        });
    } else if (window.location.pathname.toLocaleLowerCase() === '/') {
        UsuarioAutenticado().then(function (usuario) {
            //let permissao = usuario.permissaoAtual;
            window.location.href = '/home';
        });
    }
}

function Clipboard(valor) {
    var textArea = document.createElement("textarea");
    textArea.value = valor;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function ClipboardAlternativo(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
}

function Mascaras() {
    $("[data-mascara='date']").each(function () { $(this).mask('00/00/0000'); });
    $("[data-mascara='datetime']").each(function () { $(this).mask('00/00/0000 00:00'); });
    $("[data-mascara='cep']").each(function () { $(this).mask('00000-000'); });
    $("[data-mascara='phone']").each(function () { $(this).mask('(00) 00000-0000'); });
    $("[data-mascara='number']").each(function () { $(this).mask('0#'); });
    $("[data-mascara='decimal']").each(function () { $(this).mask('000.000.000.000.000,00', { reverse: true }); });
    $("[data-mascara='cpf']").each(function () { $(this).mask('000.000.000-00', { reverse: true }); });
    $("[data-mascara='cnpj']").each(function () { $(this).mask('00.000.000/0000-00', { reverse: true }); });
    $("[data-mascara='cpfCnpj']").each(function () {
        var options = {
            onKeyPress: function (cpf, ev, el, op) {
                var masks = ['000.000.000-000', '00.000.000/0000-00'];
                $(this).mask(cpf.length > 14 ? masks[1] : masks[0], op);
            }
        };
        $(this).length > 11 ? $(this).mask('00.000.000/0000-00', options) : $(this).mask('000.000.000-00#', options);
    });
}