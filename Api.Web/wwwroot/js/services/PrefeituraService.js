async function PrefeituraSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Prefeitura/Salvar', obj).then(function (response) {
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

async function PrefeituraListaPrefeituras(busca) {
    return new Promise((resolve, reject) => {
        Get('Prefeitura/ListaPrefeituras?busca=' + busca).then(function (response) {
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

async function PrefeituraExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Prefeitura/Excluir?id=' + id).then(function (response) {
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

async function PrefeituraAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Prefeitura/Ativar?id=' + id).then(function (response) {
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

async function PrefeituraDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Prefeitura/Desativar?id=' + id).then(function (response) {
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

async function PrefeituraBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Prefeitura/BuscaPorId?id=' + id).then(function (response) {
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

async function ImprimirPrefeituras(nome_Prefeitura, descricao, endereco, cgc, status,) {
    return new Promise((resolve, reject) => {
        Post('Prefeitura/ImprimirPrefeituras?nome_Prefeitura=' + nome_Prefeitura + '&descricao=' + descricao + ' &endereco=' + endereco + '&cgc=' + cgc + '&status=' + status ).then(function (response) {
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