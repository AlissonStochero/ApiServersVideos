async function SecretariaSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Secretaria/Salvar', obj).then(function (response) {
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

async function SecretariaListaSecretarias(busca) {
    return new Promise((resolve, reject) => {
        Get('Secretaria/ListaSecretarias?busca=' + busca).then(function (response) {
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

async function SecretariaExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Secretaria/Excluir?id=' + id).then(function (response) {
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

async function SecretariaAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Secretaria/Ativar?id=' + id).then(function (response) {
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

async function SecretariaDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Secretaria/Desativar?id=' + id).then(function (response) {
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

async function SecretariaBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Secretaria/BuscaPorId?id=' + id).then(function (response) {
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
async function ImprimirSecretarias(descricao, responsavel, orgaoId, status) {
    return new Promise((resolve, reject) => {
        Post('Secretaria/ImprimirSecretarias?descricao=' + descricao + '&responsavel=' + responsavel + '&orgaoId=' + orgaoId + '&status=' + status).then(function (response) {
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
