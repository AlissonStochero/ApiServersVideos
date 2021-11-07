$(document).ready(function () {
    botaoPadrao('btn-submit');
    load();
});


function load() {
    return new Promise((resolve, reject) => {
        let id = getUltimoAlias();
        if (id && id.toLowerCase() !== 'formulario') { //Vai ver se é um cadastro ou edição
            $('#tipo-formulario').html('Editar');
            SecretariaBuscaPorId(id).then(function (obj) { //busca os dados pra colocar nos campos quando é edição
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
                $('#orgaoId').select2();
                resolve(obj);
            });
        } else {
            $('#tipo-formulario').html('Novo');
            $("input").first().focus();
            resolve();
        }
    });
}


$(document).ready(function () {
    loadOrgaos();
});




function salvar(elemento) {
    let obj = {

        descricao: ($("[name='descricao']").val() || ''),
        responsavel: ($("[name='responsavel']").val() || ''),
        orgaoId: ($("[name='orgaoId']").val() || ''),
        status: document.getElementById("status").checked,


    };
    let id = getUltimoAlias();
    if (id && id.toLowerCase() !== 'formulario') {
        obj.id = getUltimoAlias();
    }

    loading(elemento);
    SecretariaSalvar(obj).then(function () {
        window.location.href = '/secretaria';
        notification('Cadastro realizado com sucesso!', 'success')
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        $('#alert-erro').html(err);
        $('#alert-erro').show();
        $('html,body').animate({ scrollTop: $(document).height() }, 1000);
    });
}


function loadOrgaos() {
    OrgaoListaOrgaos().then(function (data) {
        if (data.count === 0) {
        } else {
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                document.getElementById("orgaoId").add(new Option(obj.orgaos, obj.id));
            }
            $('#orgaoId').select2();
            load();
        }
    });
}