
//1.  Bind
// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],
//     showList: function() {
//         this.students.forEach(function(student) {
//             console.log(this.title + ": " + student
//             );
//         }.bind(this));
//     }
// };
// group.showList();

// 2. Call

// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],
//     showList: function() {
//         this.students.forEach((stu) => function(student) {
//             console.log(this.title + ": " + student);
//         }.call(this, stu));
//     }
// };
// group.showList();

// 3. Apply
// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],
//     showList: function() {
//         this.students.forEach((student) => function() {
//             console.log(this.title + ": " + student);
//         }.apply(this));
//     }
// };
// group.showList();

// 4.  by self pattern
// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],
//     showList: function() {
//         const self = this;
//         this.students.forEach(function(student) {
//             console.log(self.title + ": " + student
//             );
//         });
//     }
// };
// group.showList();

// 5.

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList: function() {
        this.students.forEach((student) => {
            console.log(this.title + ": " + student
            );
        });
    }
};
group.showList();