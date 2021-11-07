$(document).ready(function () {
    botaoPadrao('btn-submit');
    load();
});


function load() {
    return new Promise((resolve, reject) => {
        let id = getUltimoAlias();
        if (id && id.toLowerCase() !== 'formulario') { //Vai ver se é um cadastro ou edição
            $('#tipo-formulario').html('Editar');
            UsuarioBuscaPorId(id).then(function (obj) { //busca os dados pra colocar nos campos quando é edição
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let input = $("[name='" + key + "']");
                        if (key == 'status') {
                            document.getElementById("status").checked = obj[key];
                        } else if (input) {
                            input.val(obj[key]);
                        }
                    }
                }
                resolve(obj);
            });
        } else {
            $('#tipo-formulario').html('Novo');
            $("input").first().focus();
            resolve();
        }
    });
}



function salvar(elemento) {
    let obj = {

        nome: ($("[name='nome']").val() || ''),
        email: ($("[name='email']").val() || ''),
        senha: ($("[name='senha']").val() || ''),
        descricao: ($("[name='descricao']").val() || ''),
        status: document.getElementById("status").checked,

    };
    let id = getUltimoAlias();
    if (id && id.toLowerCase() !== 'formulario') {
        obj.id = getUltimoAlias();
    }


    loading(elemento);
   UsuarioSalvar(obj).then(function () {
        window.location.href = '/usuario';
        notification('Cadastro realizado com sucesso!', 'success')
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        $('#alert-erro').html(err);
        $('#alert-erro').show();
        $('html,body').animate({ scrollTop: $(document).height() }, 1000);
    });
}

let senha = document.getElementById('senha');
let senhaC = document.getElementById('senhaC');

function validarSenha() {
    if (senha.value != senhaC.value) {
        senhaC.setCustomValidity("Senhas diferentes!");
        senhaC.reportValidity();
        return false;
    } else {
        senhaC.setCustomValidity("");
        return true;
    }
}
// verificar também quando o campo for modificado, para que a mensagem suma quando as senhas forem iguais
senhaC.addEventListener('input', validarSenha);


function verificaForcaSenha() {
    var numeros = /([0-9])/;
    var alfabetoa = /([a-z])/;
    var alfabetoA = /([A-Z])/;
    var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;


    if ($('#senha').val().length < 6) {
        $('#password-status').html("<span style='color:red'>Fraco, insira no mínimo 6 caracteres</span>");
    } else {
        if ($('#senha').val().match(numeros) && $('#senha').val().match(alfabetoa) && $('#senha').val().match(alfabetoA) && $('#senha').val().match(chEspeciais)) {
            $('#password-status').html("<span style='color:green'><b>Forte</b></span>");
        } else {
            $('#password-status').html("<span style='color:orange'>Médio</span>");
        }
    }
}

