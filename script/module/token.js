class ClassToken {
    token = false;
    user = false;

    constructor () {
        this.token = localStorage.getItem('token');

        if (this.token == null) {
            this.token = false;
            return;
        }

        const result = db.where('auths', 'token', this.token);
        if (result == false) {
            this.token = false;
            return;
        } else {
            this.user = db.find('users', result.user_id);
        }
    }

    gen(user) {
        this.token = '';
        for (let i = 0; i < 128; i++) {
            this.token += en_num[randint(0, 36)];
        }

        localStorage.setItem('token', this.token);
        const result  = db.insert('auths', {
            user_id: user.id,
            token: this.token,
        })
        if (result) {
            return true;
        }
    }
    out() {
        const result = db.where('auths', 'token', this.token);
        db.delete('auths', result.id);
        localStorage.removeItem('token');
    }

    auth() {
        return !this.token?false:true;
    }
}

const token = new ClassToken();
