const inputLogin = document.querySelector('main #login');
const inputPass = document.querySelector('main #password');
const submit = document.querySelector('main #submit');
const error = document.querySelector('main .form .error');

submit.onclick = () => {
    const user = db.where('users', 'login', inputLogin.value);

    if ( (user != false) && (user.password == inputPass.value) ) {
        if (token.gen(user)) {
            document.location.href = 'index.html';
        } else {
            console.log('error');
        }
    } else {
        error.style.display = 'block';
        setTimeout(() => {
            error.style.display = 'none';
        }, 2000);
    }
}
