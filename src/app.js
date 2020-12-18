const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/exams',getExams);
app.post('/api/exams',postExam);

module.exports = app;