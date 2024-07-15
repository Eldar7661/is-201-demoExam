const main = document.querySelector('main');
const span = document.createElement('div');

span.innerText = decodeURI(localStorage.getItem('errorPage'));
main.append(span);
