$(document).ready(function () {
    loadAssuntos();
    loadDepartamentos();
    loadSecretarias();
    botaoPadrao('btn-submit');
    load();
});




function load() {
    return new Promise((resolve, reject) => {
        let id = getUltimoAlias();
        if (id && id.toLowerCase() !== 'formulario') { //Vai ver se é um cadastro ou edição
            $('#tipo-formulario').html('Editar');
            LancamentoBuscaPorId(id).then(function (obj) { //busca os dados pra colocar nos campos quando é edição
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
                if (obj.data != null) {
                    $("#data").prop("disabled", false);
                    $('[name="data"]').val(moment(obj.data).format('YYYY-MM-DD'));
                }

                $('#assuntoId').select2();
                $('#secretariaId').select2();
                $('#departamentoId').select2();
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
        caixa: ($("[name='caixa']").val() || ''),
        prateleira: ($("[name='prateleira']").val() || ''),
        assuntoId: ($("[name='assuntoId']").val() || ''),
        secretariaId: ($("[name='secretariaId']").val() || ''),
        departamentoId: ($("[name='departamentoId']").val() || ''),
        descricao: ($("[name='descricao']").val() || ''),
        data: ($("[name='data']").val() || ''),
        status: document.getElementById("status").checked,



    };
    let id = getUltimoAlias();
    if (id && id.toLowerCase() !== 'formulario') {
        obj.id = getUltimoAlias();

    }

    loading(elemento);
    LancamentoSalvar(obj).then(function () {
        window.location.href = '/lancamento';
        notification('Cadastro realizado com sucesso!', 'success')
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        $('#alert-erro').html(err);
        $('#alert-erro').show();
        $('html,body').animate({ scrollTop: $(document).height() }, 1000);
    });
}


function loadAssuntos() {
    AssuntoListaAssuntos().then(function (data) {
        if (data.count === 0) {
        } else {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                document.getElementById("assuntoId").add(new Option(obj.descricao, obj.id));
            }
            $('#assuntoId').select2();
            load();
        }
    });
}

function loadSecretarias() {
    SecretariaListaSecretarias().then(function (data) {
        if (data.count === 0) {
        } else {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                document.getElementById("secretariaId").add(new Option(obj.descricao, obj.id));
            }
            $('#secretariaId').select2();
            load();
        }
    });
}

function loadDepartamentos() {
    DepartamentoListaDepartamentos().then(function (data) {
        if (data.count === 0) {
        } else {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                document.getElementById("departamentoId").add(new Option(obj.descricao, obj.id));
            }
            $('#departamentoId').select2();
            load();
        }
    });
}


