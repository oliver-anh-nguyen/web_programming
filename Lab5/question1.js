function sum(arr) {
   const ans = arr.filter(x => x > 20)
       .reduce((x, y) => x + y, 0);
   return ans;
}
console.log(sum([1,2,20,30,40]));