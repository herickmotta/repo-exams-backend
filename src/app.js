const express = require("express");
const cors = require("cors");
const app = express();
const examController = require("./controllers/examController");
app.use(cors());
app.use(express.json());


app.get('/api/exams',examController.getExams);
app.post('/api/exams',examController.postExam);
app.get('/api/periods',examController.getPeriods);
app.get('/api/professors/subject/:subjectId',examController.getProfessors);
app.get('/api/subjects/professor/:professorId',examController.getSubjects);
module.exports = app;