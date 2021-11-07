$(document).ready(function () {
    if (GetCookie('nao-tocar-som-notificacao')) {
        $('#btn-ativar-notificacao').show();
        $('#btn-desativar-notificacao').hide();
    } else {
        $('#btn-ativar-notificacao').hide();
        $('#btn-desativar-notificacao').show();
    }
    verificarPaginaAtiva();
    //buscarDadosAcesso().then(function () {
    //});
});

function ativaDesativaSomNotificacao(valor) {
    SetCookie('nao-tocar-som-notificacao', valor);
    if (GetCookie('nao-tocar-som-notificacao')) {
        $('#btn-ativar-notificacao').show();
        $('#btn-desativar-notificacao').hide();
    } else {
        $('#btn-ativar-notificacao').hide();
        $('#btn-desativar-notificacao').show();
    }
}

function buscarDadosAcesso() {
    return new Promise((resolve, reject) => {
        let idUsuario = GetCookie('id-usuario');
        let nomeUsuario = GetCookie('nome-usuario');
        let tipoUsuario = GetCookie('tipo-usuario');
        if (!idUsuario || !nomeUsuario || !tipoUsuario) {
            UsuarioAutenticado().then(function (usuario) {
                $('#dados-usuario-logado').html('Usuário Logado: ' + usuario.nome);
                SetCookie('id-usuario', usuario.codigo);
                SetCookie('nome-usuario', usuario.nome);
                SetCookie('setor-usuario', usuario.descricaoSetor);
                resolve();
            });
        } else {
            $('#dados-usuario-logado').html('Usuário Logado: ' + nomeUsuario);
            resolve();
        }
    });
}

function verificarPaginaAtiva() {
    let nomePagina = window.location.pathname.replace('/', '');
    if (nomePagina.indexOf('/') > -1) {
        nomePagina = nomePagina.substring(0, nomePagina.indexOf('/'));
    }
    if (nomePagina && $('#' + nomePagina) && $('#' + nomePagina).parent()) {
        $('#nav-' + nomePagina).parent().addClass('active');
    }
}



