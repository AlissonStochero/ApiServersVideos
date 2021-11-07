$(document).ready(function () {
    botaoPadrao('btn-submit');
    load();
});


function load() {
    return new Promise((resolve, reject) => {
        let id = getUltimoAlias();
        if (id && id.toLowerCase() !== 'formulario') { //Vai ver se é um cadastro ou edição
            $('#tipo-formulario').html('Editar');
            PrefeituraBuscaPorId(id).then(function (obj) { //busca os dados pra colocar nos campos quando é edição
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

        nome_Prefeitura: ($("[name='nome_Prefeitura']").val() || ''),
        endereco: ($("[name='endereco']").val() || ''),
        descricao: ($("[name='descricao']").val() || ''),
        cgc: ($("[name='cgc']").val() || ''),
        status: document.getElementById("status").checked,
       

    };

    let id = getUltimoAlias();
    if (id && id.toLowerCase() !== 'formulario') {
        obj.id = getUltimoAlias();
    }

    loading(elemento);
    PrefeituraSalvar(obj).then(function () {
        window.location.href = '/prefeitura';
        notification('Cadastro realizado com sucesso!', 'success')
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        $('#alert-erro').html(err);
        $('#alert-erro').show();
        $('html,body').animate({ scrollTop: $(document).height() }, 1000);
    });
}



