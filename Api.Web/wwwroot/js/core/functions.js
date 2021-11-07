Number.prototype.formatarValor = function (places, symbol) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : '';
    let thousand = '.';
    let decimal = ',';
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

String.prototype.replaceAll = function (search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

(function ($) {
    $.fn.focusTextToEnd = function () {
        this.focus();
        var $thisVal = this.val();
        this.val('').val($thisVal);
        return this;
    };
}(jQuery));

async function searchCep(cep) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'https://viacep.com.br/ws/' + cep + '/json',
            success: function (response) {
                if (response.localidade && !response.erro) {
                    resolve(response);
                } else {
                    reject(JSON.stringify(response));
                }
            },
            error: function (response) {
                console.error(JSON.stringify(response));
                reject('Erro desconhecido');
            }
        });
    });
}

function encapsularJson(obj) {
    return JSON.stringify(obj).replaceAll("\"", "☺").replaceAll("'", "☻");
}

function desencapsularJson(obj) {
    return JSON.parse(obj.replaceAll("☺", "\"").replaceAll("☻", "'"));
}

function setFocus(id) {
    setTimeout(function () {
        $('#' + id).focusTextToEnd();
    }, 50);
}

function notification(message, color) {
    $.notifyClose();
    $.notify({
        message: message
    },
    {
        type: color,
        timer: 5000,
        allow_dismiss: false,
        placement: {
            from: 'bottom',
            align: 'right'
        }
    });
}

function getUltimoAlias() {
    return window.location.toString().split('/').pop();
}

function getParametro(nome) {
    let url = window.location.search.substring(1),
        variaveis = url.split('&'),
        parametro,
        i;

    for (i = 0; i < variaveis.length; i++) {
        parametro = variaveis[i].split('=');

        if (parametro[0] === nome) {
            return parametro[1] === undefined ? true : decodeURIComponent(parametro[1]);
        }
    }

    return null;
}

function botaoPadrao(id) {
    $(document).unbind("keypress");
    $(document).removeAttr("keypress");

    if (id) {
        $(document).on('keypress', function (e) {
            if ((e.keyCode || e.which) === 13) {
                $('#' + id).click();
            }
        });
    }
}

function sair() {
    DeleteAllCookies();
    window.location.href = '/';
}

var tempElementHtml = '';
function loading(element) {
    tempElementHtml = $(element).html();
    $(element).attr('disabled', true);
    $(element).html('<i style="font-size: 18px;" class="fa fa-circle-notch fa-spin" />'); 
}

function unloading(element) {
    $(element).html(tempElementHtml);
    $(element).attr('disabled', false);
}

function paginacao(obj) {
    if ($('#paginacao').length) {
        if (obj.totalRegistros === 0) {
            $('#paginacao').hide();
        } else {
            // Paginação
            $('#paginacao-numeros').html('');

            // Página Anterior
            $('#paginacao-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" id="paginacao-pagina-anterior"><i class="la la-angle-left"></i></a></li>');

            if (obj.pagina === 1) {
                $('#paginacao-pagina-anterior').attr('disabled', true);
                $('#paginacao-pagina-anterior').parent().addClass('disabled');
                $('#paginacao-pagina-anterior').prop("onclick", null).off("click");
            } else {
                $('#paginacao-pagina-anterior').attr('disabled', false);
                $('#paginacao-pagina-anterior').parent().removeClass('disabled');
                $('#paginacao-pagina-anterior').on("click", function () {
                    load(obj.pagina - 1);
                });
            }

            // Páginas sequenciais
            let paginas = [];
            paginas.push(obj.pagina - 5);
            paginas.push(obj.pagina - 4);
            paginas.push(obj.pagina - 3);
            paginas.push(obj.pagina - 2);
            paginas.push(obj.pagina - 1);
            paginas.push(obj.pagina);
            paginas.push(obj.pagina + 1);
            paginas.push(obj.pagina + 2);
            paginas.push(obj.pagina + 3);
            paginas.push(obj.pagina + 4);
            paginas.push(obj.pagina + 5);

            if (obj.pagina > 3) {
                paginas = paginas.slice(3);
                paginas = paginas.slice(0, 5);
            }

            let paginasRemovidas = 0;
            while (obj.numeroPaginas < paginas[paginas.length - 1]) {
                paginas.pop();
                paginasRemovidas++;
            }

            for (let i = 0; i < paginasRemovidas; i++) {
                let numeroPagina = paginas[0] - 1;
                paginas.unshift(numeroPagina);
            }

            let aux = 0;
            for (let i = 0; i < paginas.length; i++) {
                let numero = paginas[i];
                if (numero > 0) {
                    aux++;
                    if (obj.numeroPaginas >= numero) {
                        if (obj.pagina === numero) {
                            $('#paginacao-numeros').append('<li class="page-item active"><a class="page-link" href="javascript:void(0);" id="paginacao-numero-' + numero + '">' + numero + '</a></li>');
                        } else {
                            $('#paginacao-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" onclick="load(' + numero + ')" id="paginacao-numero-' + numero + '">' + numero + '</a></li>');
                        }
                    }
                }
                if (aux === 5) {
                    break;
                }
            }

            // Próxima Página
            $('#paginacao-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" id="paginacao-pagina-proxima"><i class="la la-angle-right"></i></a></li>');
            if (obj.pagina === obj.numeroPaginas) {
                $('#paginacao-pagina-proxima').attr('disabled', true);
                $('#paginacao-pagina-proxima').parent().addClass('disabled');
                $('#paginacao-pagina-proxima').prop("onclick", null).off("click");
            } else {
                $('#paginacao-pagina-proxima').attr('disabled', false);
                $('#paginacao-pagina-proxima').parent().removeClass('disabled');
                $('#paginacao-pagina-proxima').on("click", function () {
                    load(obj.pagina + 1);
                });
            }

            // Infos
            $('#paginacao-registro-inicial').html(obj.registroInicial);
            $('#paginacao-registro-final').html(obj.registroFinal);
            $('#paginacao-registro-total').html(obj.totalRegistros);

            $('#paginacao').show();
            $('#paginacao-info').show();
        }
    }
}

function paginacaoModal(obj) {
    if ($('#paginacao-modal').length) {
        if (obj.totalRegistros === 0) {
            $('#paginacao-modal').hide();
        } else {
            // Paginação
            $('#paginacao-modal-numeros').html('');

            // Página Anterior
            $('#paginacao-modal-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" id="paginacao-modal-pagina-anterior"><i class="la la-angle-left"></i></a></li>');

            if (obj.pagina === 1) {
                $('#paginacao-modal-pagina-anterior').attr('disabled', true);
                $('#paginacao-modal-pagina-anterior').parent().addClass('disabled');
                $('#paginacao-modal-pagina-anterior').prop("onclick", null).off("click");
            } else {
                $('#paginacao-modal-pagina-anterior').attr('disabled', false);
                $('#paginacao-modal-pagina-anterior').parent().removeClass('disabled');
                $('#paginacao-modal-pagina-anterior').on("click", function () {
                    load(obj.pagina - 1);
                });
            }

            // Páginas sequenciais
            let paginas = [];
            paginas.push(obj.pagina - 5);
            paginas.push(obj.pagina - 4);
            paginas.push(obj.pagina - 3);
            paginas.push(obj.pagina - 2);
            paginas.push(obj.pagina - 1);
            paginas.push(obj.pagina);
            paginas.push(obj.pagina + 1);
            paginas.push(obj.pagina + 2);
            paginas.push(obj.pagina + 3);
            paginas.push(obj.pagina + 4);
            paginas.push(obj.pagina + 5);

            if (obj.pagina > 3) {
                paginas = paginas.slice(3);
                paginas = paginas.slice(0, 5);
            }

            let paginasRemovidas = 0;
            while (obj.numeroPaginas < paginas[paginas.length - 1]) {
                paginas.pop();
                paginasRemovidas++;
            }

            for (let i = 0; i < paginasRemovidas; i++) {
                let numeroPagina = paginas[0] - 1;
                paginas.unshift(numeroPagina);
            }

            let aux = 0;
            for (let i = 0; i < paginas.length; i++) {
                let numero = paginas[i];
                if (numero > 0) {
                    aux++;
                    if (obj.numeroPaginas >= numero) {
                        if (obj.pagina === numero) {
                            $('#paginacao-modal-numeros').append('<li class="page-item active"><a class="page-link" href="javascript:void(0);" id="paginacao-modal-numero-' + numero + '">' + numero + '</a></li>');
                        } else {
                            $('#paginacao-modal-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" onclick="load(' + numero + ')" id="paginacao-modal-numero-' + numero + '">' + numero + '</a></li>');
                        }
                    }
                }
                if (aux === 5) {
                    break;
                }
            }

            // Próxima Página
            $('#paginacao-modal-numeros').append('<li class="page-item"><a class="page-link" href="javascript:void(0);" id="paginacao-modal-pagina-proxima"><i class="la la-angle-right"></i></a></li>');
            if (obj.pagina === obj.numeroPaginas) {
                $('#paginacao-modal-pagina-proxima').attr('disabled', true);
                $('#paginacao-modal-pagina-proxima').parent().addClass('disabled');
                $('#paginacao-modal-pagina-proxima').prop("onclick", null).off("click");
            } else {
                $('#paginacao-modal-pagina-proxima').attr('disabled', false);
                $('#paginacao-modal-pagina-proxima').parent().removeClass('disabled');
                $('#paginacao-modal-pagina-proxima').on("click", function () {
                    load(obj.pagina + 1);
                });
            }

            // Infos
            $('#paginacao-modal-registro-inicial').html(obj.registroInicial);
            $('#paginacao-modal-registro-final').html(obj.registroFinal);
            $('#paginacao-modal-registro-total').html(obj.totalRegistros);

            $('#paginacao-modal').show();
            $('#paginacao-modal-info').show();
        }
    }
}
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function formataCpfCnpj(valor) {
    if (!valor || valor.length <= 4) {
        return valor;
    }

    try {
        valor = valor.replace(".", "").replace(".", "").replace("-", "").replace("/", "").trim();
        if (valor.length <= 11) {
            if (valor.length < 11) { valor = padLeft(valor, 11); }
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            return valor;
        } else {
            if (valor.length < 14) { valor = padLeft(valor, 14); }
            valor = valor.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
            return valor;
        }
    } catch {
        return valor;
    }
}