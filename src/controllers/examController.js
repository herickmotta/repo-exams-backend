const connection = require("../database");
const examRepository = require("../repositories/examRepository");
async function postExam(req,res){
    try{
        const exam = await examRepository.create();
        res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function getExams(req,res){
    try{
        const exams = await examRepository.getAll();
        res.send(exams);
    } 
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function getPeriods(req,res){
    try{
        const periods = await examRepository.getPeriods();
        res.send(periods);
    } 
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports = {
    postExam,
    getExams,
    getPeriods
}