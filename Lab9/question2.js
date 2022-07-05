function Question(qid, answer) {
    this.qid = qid;
    this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

function Student(studentId) {
    this.studentId = studentId;
    this.answers = [];
}

Student.prototype.addAnswer = function (question) {
    this.answers.push(question);
}

function Quiz(questions, students) {
    this.questions = new Map();
    questions.forEach(q => this.questions.set(q.qid, q.answer));
    this.students = students;
}

Quiz.prototype.scoreStudentBySid = function(studentId) {
    const student = this.students.filter(s => s.studentId === studentId)[0]; return student.answers.reduce((sum, currentQuestion) => {
        if (currentQuestion.checkAnswer(this.questions.get(currentQuestion.qid))) sum = sum + 1;
    }, 0);
    return sum;
}


Quiz.prototype.getAverageScore = function () {
    return this.students.reduce((accmulator, student, index, array) => {
        return accmulator + this.scoreStudentBySid(student.studentId) / array.len
    }, 0);
    const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b ')];
    const student1 = new Student(10);
    student1.addAnswer(new Question(2, 'a'));
    student1.addAnswer(new Question(3, 'b'));
    student1.addAnswer(new Question(1, 'b'));
    {
        gth;
    }
    const student2 = new Student(11);
    student2.addAnswer(new Question(3, 'b'));
    student2.addAnswer(new Question(2, 'a'));
    student2.addAnswer(new Question(1, 'd'));
    const students = [student1, student2];
    const quiz = new Quiz(questions, students);

    let scoreforStudent10 = quiz.scoreStudentBySid(10);
    console.log(scoreforStudent10);
    let scoreforStudent11 = quiz.scoreStudentBySid(11);
    console.log(scoreforStudent11);
    let average = quiz.getAverageScore();
    console.log(average);
}