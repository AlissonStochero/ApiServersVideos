async function DepartamentoSalvar(obj) {
    return new Promise((resolve, reject) => {
        Post('Departamento/Salvar', obj).then(function (response) {
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

async function DepartamentoListaDepartamentos(busca) {
    return new Promise((resolve, reject) => {
        Get('Departamento/ListaDepartamentos?busca=' + busca).then(function (response) {
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


async function DepartamentoExcluir(id) {
    return new Promise((resolve, reject) => {
        Delete('Departamento/Excluir?id=' + id).then(function (response) {
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
async function DepartamentoBuscaPorId(id) {
    return new Promise((resolve, reject) => {
        Get('Departamento/BuscaPorId?id=' + id).then(function (response) {
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

async function DepartamentoAtivar(id) {
    return new Promise((resolve, reject) => {
        Post('Departamento/Ativar?id=' + id).then(function (response) {
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

async function DepartamentoDesativar(id) {
    return new Promise((resolve, reject) => {
        Post('Departamento/Desativar?id=' + id).then(function (response) {
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

async function ImprimirDepartamentos(descricao, status) {
    return new Promise((resolve, reject) => {
        Post('Departamento/ImprimirDepartamentos?descricao=' + descricao + '&status=' + status).then(function (response) {
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
