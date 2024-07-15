const catigoryList = document.querySelector('main .catigory .list');
const content = document.querySelector('main .content');

db.selectOriginal('categorys').forEach( catalog => {
    const a = document.createElement('a');
    a.setAttribute('href', './articles.html?cat='+catalog.category);
    a.innerText = catalog.category;
    catigoryList.append(a);
});

const catalog = params.parse('cat');

if (catalog === false) {
    db.select('articles').forEach( article => {
        content.append(createArticle(article));
    });
} else {

    const catigoryObj = db.where('categorys', 'category', catalog);
    const articles = db.where('articles', 'category', catigoryObj.id);
    if (articles === false) {
        localStorage.setItem('errorPage', document.location.href);
        document.location.href = './notfound.html';
    }

    try {
        articles.forEach( article => {
            content.append(createArticle(article));
        });
    } catch (error) {
        content.append(createArticle(articles));
    }
}


function createArticle(article) {
    const section = document.createElement('section');

    section.innerHTML = `
        <div class="image">
            <img src="./image/art/`+article.id+`.jpg" alt="">
        </div>
        <div class="sect title">`+article.title+`</div>
        <div class="sect text">`+article.text+`</div>
        <div class="sect block">
            <div>Катигория: `+article.category+`</div>
            <div>Автор: `+article.author+`</div>
            <div>Дата: `+article.date+`</div>
        </div>
        <div class="sect link">
            <a href="./article.html?id=`+article.id+`">Читать</a>
        </div>
    `;
    return section;
}
