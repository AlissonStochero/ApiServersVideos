﻿$(document).ready(function () {
   
    $('#descricao').keypress(function (e) {
        if (e.which === 13) {
            BuscaConsulta();
        }
    });
    BuscaConsulta();
   
});
var table;
function BuscaConsulta() {
    $('#div-table').hide();
    $('#table-loading').show();
    if (table != undefined) {
        table.destroy();
    }

    let descricao = $('#descricao').val();
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
            "url": ResolveUrl('Assunto/ListaPaginada'),
            "type": "Post",
            "datatype": "json",
            "data": {
                descricao: descricao,
                status: status,
            },
        },
        "columns": [
            { "data": "descricao", orderable: false, "name": "descricao" },

            {
                "data": "status", orderable: false, "name": "status", render: function (value) {
                    if (value == true) { return "Ativo" } else { return "Inativo" }
                } 
            },
            {
                "data": null, "orderable": false, width: '100px', render: function (data) {
                    let btnStatus = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="ativar(\'' + data.id + '\');" title="Ativar" class= "btn btn-success btn-sm btn-table"style="padding:.10rem .5rem">' +
                        '<i class="fa fa-thumbs-up"></i>'   +
                        '</button></span>&nbsp;';
                    if (data.status) {
                        btnStatus = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="desativar(\'' + data.id + '\');" title="Desativar" class="btn btn-danger btn-sm btn-table" style="padding:.10rem .5rem">' +
                            '<i class="fa fa-thumbs-down"></i>' +
                            '</button></span>&nbsp;';
                    }
                    let html = '<span id="btn-status-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="window.location.href=\'/assunto/formulario/' + data.id + '\'" title="Editar" class="btn btn-info btn-sm btn-table" style="padding:.10rem .5rem"> ' +
                        '<i class="fas fa-edit"></i>' +
                        '</button></span>&nbsp';
                    html += btnStatus;
                    html += '<span id="btn-excluir-' + data.id + '"><button type="button" data-toggle="tooltip" data-placement="left" onclick="modalExcluir(\'' + data.id + '\', \'' + data.descricao + '\');" title="Excluir registro" class="btn btn-danger btn-sm btn-table" style="padding:.10rem .5rem"> ' +
                        '<i class="fas fa-trash-alt"></i>' +
                        '</button></span>';
                    return html;
                }
                        //{
                        //    "data": null, orderable: false, width: '100px', render: function (data) {
                        //        return `<button type="button" class="btn waves-effect waves-light btn-xs btn-warning" onclick="modalAlterar('${data.id}', '${data.descricao}')"><i class="fas fa-pencil-alt"></i></button>
                        //                <button type="button" class="btn waves-effect waves-light btn-xs btn-dark" onclick="InativarAtivar(${data.id}, this)"><i class="fas fa-minus-circle"></i></button>
                        //                <button type="button" class="btn waves-effect waves-light btn-xs btn-danger" onclick="modalExcluir('${data.id}', '${data.descricao}')"><i class="fas fa-trash-alt"></i></button>`;
                
            }
        ]
                            

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

function modalExcluir(id, nome) {
    $('#id-excluir').val(id);
    $('#spn-texto').html(nome);
    $('#myModalExcluir').modal('show');
}

function excluir(elemento) {
    loading(elemento);
    let id = $('#id-excluir').val();
    AssuntoExcluir(id).then(function () {
        BuscaConsulta();
        notification('Assunto removido com sucesso', 'success');
        unloading(elemento);
        $('#myModalExcluir').modal('hide');
        load();
    }, function (err) {
        unloading(ele);
        notification(err, 'danger');
        $('#myModalExcluir').modal('hide');
    });
}

//function modalAlterar(id, nome) {
//    $('#id-alterar').val(id);
//    $('#spn-texto').html(nome);
//    $('#myModalAlterar').modal('show');
//}

//function alterar(elemento) {
//    loading(elemento);
//    let id = $('#id-alterar').val();
//    AssuntoAlterar(id).then(function () {
//        notification('Assunto editado com sucesso', 'success');
//        unloading(elemento);
//        $('#myModalAlterar').modal('hide');
//        load();
//    }, function (err) {
//        unloading(ele);
//        notification(err, 'danger');
//        $('#myModalAlterar').modal('hide');
//    });
//}

function ativar(id) {
    AssuntoAtivar(id).then(function () {
        BuscaConsulta();
        notification('Assunto ativado', 'success');
    }, function (err) {
        notification('Erro ao ativar o assunto', 'danger');
        console.error(err);
    });
}

function desativar(id) {
    AssuntoDesativar(id).then(function () {
        BuscaConsulta();
        notification('Assunto desativado', 'success');
    }, function (err) {
        notification('Erro ao desativar o assunto', 'danger');
        console.error(err);
    });
}

function Imprimir(elemento) {
    let descricao = $('#descricao').val() || '';
    let status = $('#status').val();

    loading(elemento);
    ImprimirAssuntos(descricao, status).then(function (obj) {
        var arrrayBuffer = base64ToArrayBuffer(obj);
        var blob = new Blob([arrrayBuffer], { type: "application/pdf" });
        var link = window.URL.createObjectURL(blob);
        window.open(link, '_blank');
        unloading(elemento);
    }, function (err) {
        unloading(elemento);
        notification('Erro ao imprimir lista de assunto', 'danger');
    });
}