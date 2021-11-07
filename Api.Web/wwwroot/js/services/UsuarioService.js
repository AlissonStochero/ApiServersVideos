async function UsuarioAutenticado() {
    return new Promise((resolve, reject) => {
        Get('Usuario/Autenticado').then(function (response) {
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
async function UsuarioSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Usuario/Salvar', obj).then(function (response) {
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

async function UsuarioListaUsuarios(busca) {
    return new Promise((resolve, reject) => {
        Get('Usuario/ListaUsuarios?busca=' + busca).then(function (response) {
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

async function UsuarioExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Usuario/Excluir?id=' + id).then(function (response) {
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

async function UsuarioBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Usuario/BuscaPorId?id=' + id).then(function (response) {
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

async function UsuarioAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Usuario/Ativar?id=' + id).then(function (response) {
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

async function UsuarioDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Usuario/Desativar?id=' + id).then(function (response) {
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

async function ImprimirUsuarios(descricao, status, nome, email) {
    return new Promise((resolve, reject) => {
        Post('Usuario/ImprimirUsuarios?descricao=' + descricao + '&status=' + status + '&nome=' + nome + '&email=' + email).then(function (response) {
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
