const connection = require("../database");
const examRepository = require("../repositories/examRepository");
function postExam(req,res){
    try{
        const exam = await examRepository.create();
        res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

function getExams(req,res){
    try{
        const exams = await examRepository.getAll();
        res.send(exams);
    } 
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}