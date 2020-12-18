const connection = require("../database");
const examRepository = require("../repositories/examRepository");
const examSchemas = require("../schemas/exam");
async function postExam(req,res){
    const newExam = req.body;
    const {error} = examSchemas.exam.validate(newExam);
    if(error) return res.sendStatus(422);
    try{
        const exam = await examRepository.create(newExam);
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
        let newExams;
        if(req.query.listBy === 'professor'){ 
            const professors = await examRepository.getProfessors();
            newExams = professors.map((p) =>{
                return{
                    name: p.name,
                    exams: exams.filter(e=> e.professor === p.name)
                }
            });
        } else{
            const subjects = await examRepository.getSubjects();
            newExams = subjects.map((s) =>{
                return{
                    name: s.name,
                    exams: exams.filter(e=> e.subject === s.name)
                }
            });
        }
        res.send(newExams);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    
}

async function getProfessors(req,res){
    try{
        const professors = await examRepository.getProfessors();
        res.send(professors);
    } 
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function getSubjects(req,res){
    try{
        const subjects = await examRepository.getSubjects();
        res.send(subjects);
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
    getPeriods,
    getProfessors,
    getSubjects
}