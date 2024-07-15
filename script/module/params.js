class Params {
    params = [];

    constructor() {
        document.location.search.replace('?', '').split('&').forEach(param => {
            this.params.push(param.split('='));
        });
    }

    parse(key) {
        let search = false;
        let value = null;
        this.params.forEach( param => {
            if (param[0] == key) {
                search = true;
                value = decodeURI(param[1]);
                return;
            }
        });

        return search?value:false;
    }
}

const params = new Params();
