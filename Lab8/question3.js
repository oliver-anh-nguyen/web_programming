Array.prototype.mySort = function () {
    let arr = this;
    let n = arr.length;

    for (let i=0; i<n; i++) {
        for (let j=i+1; j<n; j++) {
            if (arr[j] < arr[i]) {
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

console.log([7, 3, 1, 2, 4].mySort());