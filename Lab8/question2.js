function Student(firstName, lastName, grade = []) {
    this.fName = firstName;
    this.lName = lastName;
    this.grades = grade;
}

Student.prototype.inputNewGrade = function (newGrade) {
    this.grades.push(newGrade);
}

Student.prototype.computeAverage = function () {
    return this.grades.reduce((pre, cur, i, arr) => pre + cur / arr.length, 0);
}

const student1 = new Student("Anh", "Nguyen");
student1.inputNewGrade(107);
student1.inputNewGrade(99);
student1.inputNewGrade(98);
student1.inputNewGrade(97);

const student2 = new Student("Thu", "Tran");
student2.inputNewGrade(99);
student2.inputNewGrade(100);
student2.inputNewGrade(99);
student2.inputNewGrade(100);

const students = [student1, student2];
const ans = students.reduce((avg, cur, i, arr) => avg + cur.computeAverage() / arr.length, 0);
console.log(ans);