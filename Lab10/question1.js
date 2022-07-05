Array.prototype.even = function () {
    const arr = this;
    return arr.filter(i => i % 2 == 0);
}

Array.prototype.odd = function () {
    const arr = this;
    return arr.filter(i => i % 2 != 0);
}

console.log([1, 5, 1, 2, 6, 7, 8].even());
console.log([1, 5, 1, 2, 6, 7, 8].odd());