async function AssuntoSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Assunto/Salvar', obj).then(function (response) {
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

async function AssuntoListaAssuntos(busca) {
    return new Promise((resolve, reject) => {
        Get('Assunto/ListaAssuntos?busca=' + busca).then(function (response) {
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


async function AssuntoExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Assunto/Excluir?id=' + id).then(function (response) {
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

async function AssuntoBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Assunto/BuscaPorId?id=' + id).then(function (response) {
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

async function AssuntoAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Assunto/Ativar?id=' + id).then(function (response) {
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

async function AssuntoDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Assunto/Desativar?id=' + id).then(function (response) {
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

async function ImprimirAssuntos(descricao, status) {
    return new Promise((resolve, reject) => {
        Post('Assunto/ImprimirAssuntos?descricao=' + descricao + '&status=' + status ).then(function (response) {
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