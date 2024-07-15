class DB {
    table = Tab;

    constructor() {
        let db = localStorage.getItem('db');
        if (db === null) {
            let json = JSON.stringify(this.table);
            localStorage.setItem('db', json);
        } else {
            this.table = JSON.parse(db);
        }
    }

    selectOriginal(table) {
        return JSON.parse(JSON.stringify(Object.values(this.table[table])));
    }

    forenkey(table, obj) {
        this.selectOriginal('forenkey').forEach( forenkey => {
            if ( forenkey.key[0] == table ) {

                const row = forenkey.key[1];

                try {
                    obj.forEach( record => {
                        const row_id = record[row];
                        const line = this.find(forenkey.key[2], row_id);
                        record[row] = line[forenkey.key[3]];
                    });
                } catch (error) {
                    const row_id = obj[row];
                    const line = this.find(forenkey.key[2], row_id);
                    obj[row] = line[forenkey.key[3]];
                }

            }
        });

        return obj;
    }

    select(table) {

        let tableObj = this.selectOriginal(table);
        tableObj = this.forenkey(table, tableObj);

        return tableObj;
    }

    find(table, id) {
        return this.where(table, 'id', id);
    }

    where(table, column, value) {
        let search = 0;
        let element = null;

        this.selectOriginal(table).forEach( e => {
            if ( e[column] == value ) {
                if ( search == 0 ) {
                    search = 1;
                    element = e;
                } else if ( search == 1 ) {
                    search++;
                    const temp = element;
                    element = [temp, e];
                } else {
                    element.push(e);
                }
            }
        })

        if ( search ) {
            element = this.forenkey(table, element);
        }

        return search?element:false;
    }

    insert(table, record_in) {
        const record_id = {
            id: this.lastId(table) +1,
        }

        const record = Object.assign(record_id, record_in);
        this.table[table].push(record);

        this.save();
        return true;
    }

    update(table, record_in) {
        const tableObj = Object.values(this.table[table]);

        tableObj.forEach( row => {
            if (row.id == record_in.id) {
                row = Object.assign(row, record_in);
            }
        });

        this.save();
        return true;
    }

    delete(table, id) {
        let index = 0;
        let finded = false;
        for (let i = 0; i < this.table[table].length; i++) {
            if (this.table[table][i].id == id) {
                finded = true;
                break;
            }
            index++;
        }

        if (finded) {
            this.table[table].splice(index, 1);
            this.save();
            return true;
        } else {
            return false;
        }

    }

    lastId(table) {
        const db_table = this.selectOriginal(table);
        try {
            return db_table.at(-1).id;
        } catch (error) {
            return 0;
        }
    }

    refresh() {
        let json = JSON.stringify(Tab);
        localStorage.setItem('db', json);
        document.location.href = './index.html';
    }

    save() {
        let json = JSON.stringify(this.table);
        localStorage.setItem('db', json);
    }
}

const Tab = {
    forenkey: [
        {
            id: 1,
            key: ['articles', 'author', 'users', 'name'],
        },
        {
            id: 2,
            key: ['articles', 'category', 'categorys', 'category'],
        },
    ],
    users: [
        {
            id: 1,
            login: 'l',
            password: '12345',
            name: 'Людмила Гончарова',
        },
        {
            id: 2,
            login: 'm',
            password: '12345',
            name: 'Мария Петрова',
        },
        {
            id: 3,
            login: 'a',
            password: '12345',
            name: 'Алексей Сидоров',
        },
        {
            id: 4,
            login: 'e',
            password: '12345',
            name: 'Екатерина Лебедева',
        },
    ],
    auths: [],
    categorys: [
        {
            id: 1,
            category: 'Наука',
        },
        {
            id: 2,
            category: 'Технологии',
        },
        {
            id: 3,
            category: 'История',
        },
        {
            id: 4,
            category: 'Путешествия',
        },
        {
            id: 5,
            category: 'Культура',
        },
        {
            id: 6,
            category: 'Искусство',
        },
        {
            id: 7,
            category: 'Экономика',
        },
        {
            id: 8,
            category: 'Образование',
        },
        {
            id: 9,
            category: 'Кулинария',
        },
        {
            id: 10,
            category: 'Музыка',
        },
        {
            id: 11,
            category: 'Экология',
        },
        {
            id: 12,
            category: 'Философия',
        },
        {
            id: 13,
            category: 'Мода',
        },
    ],
    articles: [
        {
            id: 1,
            title: 'Тайны глубин океана',
            category: 1,
            author: 1,
            text: 'Исследование глубин океана всегда привлекало учёных...',
            date: '2024-06-20'
        },
        {
            id: 2,
            title: 'Новые технологии в медицине',
            category: 2,
            author: 1,
            text: 'Современные технологии открывают новые возможности в лечении...',
            date: '2024-06-19'
        },
        {
            id: 3,
            title: 'История Древнего Рима',
            category: 3,
            author: 1,
            text: 'Древний Рим оставил значительный след в мировой истории...',
            date: '2024-06-18'
        },
        {
            id: 4,
            title: 'Путешествие по Амазонке',
            category: 4,
            author: 1,
            text: 'Амазонка — одна из самых больших и загадочных рек в мире...',
            date: '2024-06-17'
        },
        {
            id: 5,
            title: 'Развитие искусственного интеллекта',
            category: 2,
            author: 2,
            text: 'Искусственный интеллект меняет мир с огромной скоростью...',
            date: '2024-06-16'
        },
        {
            id: 6,
            title: 'Мифы и легенды Скандинавии',
            category: 5,
            author: 2,
            text: 'Скандинавские мифы полны захватывающих историй о богах и героях...',
            date: '2024-06-15'
        },
        {
            id: 7,
            title: 'Современное искусство',
            category: 6,
            author: 2,
            text: 'Современное искусство вызывает множество споров и обсуждений...',
            date: '2024-06-14'
        },
        {
            id: 8,
            title: 'Экономика будущего',
            category: 7,
            author: 2,
            text: 'Какие изменения ждут мировую экономику в ближайшие десятилетия...',
            date: '2024-06-13'
        },
        {
            id: 9,
            title: 'Инновации в образовании',
            category: 8,
            author: 3,
            text: 'Образовательные технологии стремительно развиваются...',
            date: '2024-06-12'
        },
        {
            id: 10,
            title: 'Загадки космоса',
            category: 1,
            author: 3,
            text: 'Космос всегда был объектом человеческого интереса и восхищения...',
            date: '2024-06-11'
        },
        {
            id: 11,
            title: 'Гастрономическое путешествие по Италии',
            category: 9,
            author: 3,
            text: 'Италия известна своей богатой кулинарной традицией...',
            date: '2024-06-10'
        },
        {
            id: 12,
            title: 'Музыкальные новинки 2024 года',
            category: 10,
            author: 3,
            text: 'В 2024 году вышло множество интересных музыкальных альбомов...',
            date: '2024-06-09'
        },
        {
            id: 13,
            title: 'Экологические проблемы современности',
            category: 11,
            author: 4,
            text: 'Проблемы экологии становятся все более актуальными...',
            date: '2024-06-08'
        },
        {
            id: 14,
            title: 'Философия древней Греции',
            category: 12,
            author: 4,
            text: 'Философия Древней Греции является основой западной мысли...',
            date: '2024-06-07'
        },
        {
            id: 15,
            title: 'Современные тенденции моды',
            category: 13,
            author: 4,
            text: 'Мода постоянно меняется, и в 2024 году нас ждут новые тренды...',
            date: '2024-06-06'
        }
    ],
};
const db = new DB();
