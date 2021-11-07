$(document).ready(function () {
    loadAssuntos();
    loadSecretarias();
    loadDepartamentos();
    BuscaConsulta();
    $(document).ready(function () {
        $('#descricao').keypress(function (e) {
            if (e.which === 13) {
                BuscaConsulta();
            }
        });
        BuscaConsulta();
      
    });
    $(window).bind('resize', function () {
        table.draw();
    });
    $(' #dataInicial, #dataFinal').change(function (e) {
        verificaDatas();
        BuscaConsulta();
    });
    $('#dataInicial, #dataFinal').keypress(function (e) {
        if (e.which === 13) {
            verificaDatas();
            BuscaConsulta();
        }
    });
});

var table;
function BuscaConsulta() {
    $('#div-table').hide();
    $('#table-loading').show();
    if (table != undefined) {
        table.destroy();
    }

    let caixa = $('#caixa').val();
    let prateleira = $('#prateleira').val();
    let assuntoId = $('#assuntoId').val();
    let secretariaId = $('#secretariaId').val();
    let departamentoId = $('#departamentoId').val();
    let descricao = $('#descricao').val();
    let dataInicial = $('#dataInicial').val();
    let dataFinal = $('#dataFinal').val();
    let status = $('#status').val();

    table = $("#dataTable").DataTable({
        "order": [[1, "asc"]],
        "pageLength": 15,
        "language": {
            "lengthMenu": "Exibindo _MENU_ registros",
            "info": "Mostrando _START_ até _END_ de _TOTAL_ registros",
            "search": "Observação",
            "zeroRecords": "Nenhum registro encontrado",
            "processing": "Buscando dados",
            "paginate": {
                "first": "Primeiro",
                "last": "Último",
                "next": "Próximo",
                "previous": "Anterior"
            }
        },
        "fnDrawCallback": function (oSettings) {
            $('#div-table').show();
            $('#table-loading').hide();
        },
        "initComplete": function (settings, json) {
            SetCookie('CP-Token', json.token)
        },
        "lengthChange": false,
        "processing": true,
        "scrollX": true,
        "serverSide": true,
        "filter": false,
        "orderMulti": false,
        "autoWidth": false,
        "ajax": {
            "headers": { 'Authorization': 'Bearer ' + GetCookie('CP-Token') },
            "url": ResolveUrl('Lancamento/ListaPaginada'),
            "type": "Post",
            "datatype": "json",
            "data": {
                caixa: caixa,
                prateleira: prateleira,
                assuntoId: assuntoId,
                secretariaId: secretariaId,
                departamentoId: departamentoId,
                descricao: descricao,
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                status: status,
            },
        },
        "columns": [
            { "data": "caixa", orderable: false, "name": "caixa" },
            { "data": "prateleira", orderable: false, "name": "prateleira" },

            {
                "data": "assunto", orderable: false, "name": "assunto", render: function (value) {
                    return value.descricao
                }
            },
            {
                "data": "secretaria", orderable: false, "name": "secretaria", render: function (value) {
                    return value.descricao
                }
            },
            {
                "data": "departamento", orderable: false, "name": "departamento", render: function (value) {
                    return value.descricao
                }
            },

            { "data": "descricao", orderable: false, "name": "descricao" },

            {
                "data": "data", orderable: false, "name": "data", render: function (data) {

                    data = moment(data).format("DD/MM/yyyy")
                        return data;
                    
                }
            },

            {
                "data": "status", orderable: false, "name": "status", render: function (value) {
                    if (value == true) { return "Ativo" } else { return "Inativo" }
                }
            },
            {
                "data": null, "orderable": false, width: '100px', render: function (data) {
                    let btnStatus = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="ativar(\'' + data.id + '\');" title="Ativar" class= "btn btn-success btn-sm btn-table"style="padding:.10rem .5rem">' +
                        '<i class="fa fa-thumbs-up"></i>' +
                        '</button></span>&nbsp;';
                    if (data.status) {
                        btnStatus = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="desativar(\'' + data.id + '\');" title="Desativar" class="btn btn-danger btn-sm btn-table" style="padding:.10rem .5rem">' +
                            '<i class="fa fa-thumbs-down"></i>' +
                            '</button></span>&nbsp;';
                    }
                    let html = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="window.location.href=\'/lancamento/formulario/' + data.id + '\'" title="Editar" class="btn btn-info btn-sm btn-table" style="padding:.10rem .5rem"> ' +
                        '<i class="fas fa-edit"></i>' +
                        '</button></span>&nbsp';
                    html += btnStatus;
                    html += '<span id="btn-excluir-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="modalExcluir(\'' + data.id + '\', \'' + data.descricao + '\');" title="Excluir registro" class="btn btn-danger btn-sm btn-table" style="padding:.10rem .5rem"> ' +
                        '<i class="fas fa-trash-alt"></i>' +
                        '</button></span>';
                    return html;
                }
                
            },
        ],

    });
    table.on('xhr', function () {
        var json = table.ajax.json();
        if (undefined != undefined) {
            if (json.status == 'error' && json.message == 'Unidade não encontrada') {
                alert(json.message);
                window.location = '/';
            }
        }
    });
    table.on('length.dt', function (e, settings, len) {
        SetCookie('pageLength', len);
    });
}


function verificaDatas() {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate());
    var dia = tomorrow.getDate();
    var mes = tomorrow.getMonth();
    var anoSistema = tomorrow.getFullYear();
    mes = mes + 1;
    if (dia <= 9) { dia = "0" + dia }
    if (mes <= 9) { mes = "0" + mes }
    if (document.getElementById('dataInicial').value == '') {
        document.getElementById('dataInicial').value = anoSistema + '-01-01';
    }
    if (document.getElementById('dataFinal').value == '') {
        document.getElementById('dataFinal').value = anoSistema + '-12-31';
    }
}

function limpar2() {
    $('#dataInicial').val("");
    $('#dataFinal').val("");
    BuscaConsulta();
}

function modalExcluir(id, nome) {
    $('#id-excluir').val(id);
    $('#spn-texto').html(nome);
    $('#myModalExcluir').modal('show');
}


function excluir(elemento) {
    loading(elemento);
    let id = $('#id-excluir').val();
    LancamentoExcluir(id).then(function () {
        BuscaConsulta();
        notification('Lançamento removido com sucesso', 'success');
        unloading(elemento);
        $('#myModalExcluir').modal('hide');
        load();
    }, function (err) {
        unloading(elemento);
        notification(err, 'danger');
        $('#myModalExcluir').modal('hide');
    });
}

function loadAssuntos() {
    return new Promise((resolve) => {
        AssuntoListaAssuntos().then(function (data) {
            if (data.count === 0) {
            } else {
                document.getElementById("assuntoId").add(new Option('Todos', null));
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    document.getElementById("assuntoId").add(new Option(obj.descricao, obj.id));
                }
                $('#assuntoId').select2();
            }
            resolve();
        });
    });
}

function loadSecretarias() {
    return new Promise((resolve) => {
        SecretariaListaSecretarias().then(function (data) {
            if (data.count === 0) {
            } else {
                document.getElementById("secretariaId").add(new Option('Todos', null));
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    document.getElementById("secretariaId").add(new Option(obj.descricao, obj.id));
                }
                $('#secretariaId').select2();
            }
            resolve();
        });
    });
}

function loadDepartamentos() {
    return new Promise((resolve) => {
        DepartamentoListaDepartamentos().then(function (data) {
            if (data.count === 0) {
            } else {
                document.getElementById("departamentoId").add(new Option('Todos', null));
                for (let i = 0; i < data.length; i++) {
                    let obj = data[i];
                    document.getElementById("departamentoId").add(new Option(obj.descricao, obj.id));
                }
                $('#departamentoId').select2();
            }
            resolve();
        });
    });
}

function ativar(id) {
    LancamentoAtivar(id).then(function () {
        BuscaConsulta();
        notification('Lançamento ativado', 'success');
    }, function (err) {
        notification('Erro ao ativar o lançamento', 'danger');
        console.error(err);
    });
}

function desativar(id) {
    LancamentoDesativar(id).then(function () {
        BuscaConsulta();
        notification('Lançamento desativado', 'success');
    }, function (err) {
        notification('Erro ao desativar o lançamento', 'danger');
        console.error(err);
    });
}

function Imprimir(elemento) {
    let descricao = $('#descricao').val() || '';
    let assuntoId = $('#assuntoId').val() || '';
    let secretariaId = $('#secretariaId').val() || '';
    let dataInicial = $('#dataInicial').val() || '';
    let dataFinal = $('#dataFinal').val() || '';
    let departamentoId = $('#departamentoId').val() || '';
    let status = $('#status').val();

    loading(elemento);
    ImprimirLancamentos(descricao, assuntoId, secretariaId, departamentoId, dataInicial, dataFinal, status).then(function (obj) {
        var arrrayBuffer = base64ToArrayBuffer(obj);
        var blob = new Blob([arrrayBuffer], { type: "application/pdf" });
        var link = window.URL.createObjectURL(blob);
        window.open(link, '_blank');
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        notification('Erro ao imprimir lista de lançamento', 'danger');
    });
}
