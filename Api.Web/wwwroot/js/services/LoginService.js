async function LoginLogar(obj) {
    return new Promise((resolve, reject) => {
        Post('Login/Logar', obj).then(function (response) {
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