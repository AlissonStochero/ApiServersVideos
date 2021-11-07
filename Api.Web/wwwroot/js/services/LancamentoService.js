async function LancamentoSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Lancamento/Salvar', obj).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}

async function LancamentoListaLancamentos(busca) {
    return new Promise((resolve, reject) => {
        Get('Lancamento/ListaLancamentos?busca=' + busca).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}

async function LancamentoExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Lancamento/Excluir?id=' + id).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}
async function LancamentoBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Lancamento/BuscaPorId?id=' + id).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}

async function LancamentoAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Lancamento/Ativar?id=' + id).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}

async function LancamentoDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Lancamento/Desativar?id=' + id).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}

async function ImprimirLancamentos(descricao,assuntoId, secretariaId, departamentoId, dataInicial, dataFinal, status) {
    return new Promise((resolve, reject) => {
        Post('Lancamento/ImprimirLancamentos?descricao=' + descricao + '&assuntoId=' + assuntoId + '&secretariaId=' + secretariaId + '&departamentoId=' + departamentoId + '&dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&status=' + status).then(function (response) {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(response.message);
            }
        }, function (err) {
            console.error(err);
            reject('Erro desconhecido');
        });
    });
}