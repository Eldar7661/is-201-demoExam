if (! token.auth() ) {
    document.location.href = './login.html';
}

const ObjDate = new Date();
const date = ObjDate.getFullYear() + '-' + (ObjDate.getMonth()+1) + '-' + ObjDate.getDate();

const table  = document.querySelector('#tableArticles');
const articles = db.where('articles', 'author', token.user.id);
try {
    articles.forEach( article => {
        table.append(createRowArticle(article));
    });
} catch (error) {
    table.append(createRowArticle(articles));
}
const tint = document.querySelector('#modalTint');
const modalCreate = document.querySelector('#modalCreate');
const intCreateTitle = document.querySelector('#modalCreate .input-title');
const intCreateText = document.querySelector('#modalCreate .input-text');
const intCreateCategory = document.querySelector('#modalCreate .input-category');

const modalEdit = document.querySelector('#modalEdit');
const selectorEditTitle = document.querySelector('#modalEdit .modal-title');
const intEditTitle = document.querySelector('#modalEdit .input-title');
const intEditText = document.querySelector('#modalEdit .input-text');
const intEditCategory = document.querySelector('#modalEdit .input-category');

const modalDelete = document.querySelector('#modalDelete');
const selectorDeleteTitle = document.querySelector('#modalDelete .modal-title');

const btnCreate = document.querySelector('#btnCreate');
const btnEdit = document.querySelectorAll('.edit');
const btnDelete = document.querySelectorAll('.delete');

const btnModalCreate = document.querySelector('#modal-btn-create');
const btnModalEdit = document.querySelector('#modal-btn-edit');
const btnModalDelete = document.querySelector('#modal-btn-delete');
const btnModalCancel = document.querySelectorAll('.modal-btn-cancel');


btnCreate.onclick = ()=> {
    tinting();
    modalCreate.style.display = 'block';
};
btnEdit.forEach( btn => {
    btn.onclick = ()=> {
        tinting();
        modalEdit.style.display = 'block';

        const articleId = btn.parentElement.parentElement.dataset.id;
        try {
            articles.forEach( article => {
                if (article.id == articleId) {
                    modalEdit.setAttribute('data-id', article.id);
                    selectorEditTitle.innerText = 'Изменить Статью №' + article.id;
                    intEditTitle.value = article.title;
                    intEditText.value = article.text;
                    const categoryId = db.where('categorys', 'category', article.category).id;
                    intEditCategory.value = categoryId;
                }
            });
        } catch (error) {
            modalEdit.setAttribute('data-id', articles.id);
            selectorEditTitle.innerText = 'Изменить Статью №' + articles.id;
            intEditTitle.value = articles.title;
            intEditText.value = articles.text;
            const categoryId = db.where('categorys', 'category', articles.category).id;
            intEditCategory.value = categoryId;
        }
    };
})
btnDelete.forEach( btn => {
    btn.onclick = ()=> {
        tinting();
        modalDelete.style.display = 'block';

        const articleId = btn.parentElement.parentElement.dataset.id;
        try {
            articles.forEach( article => {
                if (article.id == articleId) {
                    modalDelete.setAttribute('data-id', article.id);
                    selectorDeleteTitle.innerText = 'Удалить Статью №' + article.id;
                }
            });
        } catch (error) {
            modalDelete.setAttribute('data-id', articles.id);
            selectorDeleteTitle.innerText = 'Удалить Статью №' + articles.id;
        }
    };
})

btnModalCreate.onclick = () => {
    const result = db.insert('articles', {
        title: intCreateTitle.value,
        category: intCreateCategory.value,
        author: token.user.id,
        text: intCreateText.value,
        date: date
    });

    if (result) {
        document.location.reload();
    }
}

btnModalEdit.onclick = () => {
    const result = db.update('articles', {
        id: modalEdit.dataset.id,
        title: intEditTitle.value,
        category: Number(intEditCategory.value),
        author: token.user.id,
        text: intEditText.value,
        date: date
    });

    if (result) {
        document.location.reload();
    }
}

btnModalDelete.onclick = () => {
    const result = db.delete('articles', modalDelete.dataset.id);

    if (result) {
        document.location.reload();
    }
}

btnModalCancel.forEach( btn => {
    btn.onclick = untinting;
});
tint.onclick = untinting;



const categorys = db.selectOriginal('categorys');
categorys.forEach( category => {
    const selectorOption1 = document.createElement('option');
    const selectorOption2 = document.createElement('option');
    selectorOption1.setAttribute('value', category.id);
    selectorOption2.setAttribute('value', category.id);
    selectorOption1.innerText = category.category;
    selectorOption2.innerText = category.category;
    intCreateCategory.append(selectorOption1);
    intEditCategory.append(selectorOption2);
})






function untinting() {
    tint.style.display = 'none';
    modalCreate.style.display = 'none';
    modalEdit.style.display = 'none';
    modalDelete.style.display = 'none';
}
function tinting() {
    tint.style.display = 'block';
}

function createRowArticle(article) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', article.id);
    tr.innerHTML = `
        <td>`+article.id+`</td>
        <td>`+article.title+`</td>
        <td>`+article.text+`</td>
        <td>`+article.date+`</td>
        <td>`+article.category+`</td>
        <td><button class="edit"><img src="./image/icon/edit.png"></button><button class="delete"><img src="./image/icon/trash.png"></button></td>
    `;

    return tr;
}
