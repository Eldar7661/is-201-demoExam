const logo = document.querySelector('header .logo');
const btnHome = document.querySelector('#home');
const btnArticles = document.querySelector('#articles');
const btnMyarticles = document.querySelector('#myarticles');
const btnLogin = document.querySelector('#login');
const btnLogout = document.querySelector('#logout');

logo.onclick = () => { document.location.href = 'index.html'}
btnHome.onclick = () => { document.location.href = 'index.html'}
btnArticles.onclick = () => { document.location.href = 'articles.html'}
btnMyarticles.onclick = () => { document.location.href = 'myarticles.html'}
btnLogin.onclick = () => { document.location.href = 'login.html'}
btnLogout.onclick = () => { document.location.href = 'logout.html'}


if (token.auth()) {
    btnLogin.style.display = 'none';
} else {
    btnLogout.style.display = 'none';
    btnMyarticles.style.display = 'none';
}

// console.log(db.findId('auths'))
