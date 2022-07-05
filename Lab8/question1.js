const student = {
    firstName: '',
    lastName: '',
    grades: [],
    inputNewGrade: function(newGrade) {
        this.grades.push(newGrade);
    },
    computeAverage() {
        return this.grades.reduce((g1, g2, i, arr) => g1 + g2 / arr.length, 0);
    }
}

const student1 = Object.create(student);
student1.firstName = "Anh";
student1.lastName = "Nguyen";
student1.inputNewGrade(107);
student1.inputNewGrade(99);
student1.inputNewGrade(98);
student1.inputNewGrade(97);

const student2 = Object.create(student);
student2.firstName = "Thu";
student2.lastName = "Tran";
student2.inputNewGrade(99);
student2.inputNewGrade(100);
student2.inputNewGrade(99);
student2.inputNewGrade(100);

const students = [student1, student2];
const ans = students.reduce((pre, cur, i, arr) => pre + cur.computeAverage() / arr.length, 0);
console.log(ans);

