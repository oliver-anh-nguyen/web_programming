function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    loginOk() {
        alert(`${this.name} logged in`);
    },

    loginFail() {
        alert(`${this.name} failed to log in`);
    },
};
// Bind
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// Wrapper
askPassword(function () {
    user.loginOk();
}, () => user.loginFail());

// Call
askPassword(() => user.loginOk.call(user),() => user.loginFail().call(user));

// Apply
askPassword(function () {user.loginOk.apply(user)}, function () {user.loginFail.apply(user)})