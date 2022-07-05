const getNewArray = function(arr) {
    return arr.filter(s => s.length >= 5 && s.includes('a'))
}

console.log(getNewArray(["anh", "em", "anhnha", "oknea", "lololo"]))