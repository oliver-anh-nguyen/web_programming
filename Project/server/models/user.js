let users = [
    {
        id: '1',
        username: 'user1',
        password: '123'
    },
    {
        id: '2',
        username: 'user2',
        password: '123'
    }
];

module.exports = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static login(username, password) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return {accessToken:`${user.username}-${Date.now()}`};
        } else {
            return {error: 'invalid-user'};
        }
    }
};