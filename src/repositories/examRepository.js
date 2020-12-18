const { Connection } = require("pg");
const connection = require("../database");

async function getProfessorsSubject(){
    const result = await connection.query(`
        SELECT p.name as "pName",s.name as "sName" FROM professors as p 
        JOIN subject_professor as sp ON p.id = sp."professorId"
        JOIN subjects as s ON sp."subjectId" = s.id; 
    `)
}
async function getAll(){
    const result = await connection.query(`
        SELECT e.id,s.name as "subject",e.year,e."URL",
        p.name AS "professor", periods.name AS "period" 
        FROM subjects AS "s"
        JOIN exams AS "e" ON e."subjectId" = s.id
        JOIN professors AS "p" ON e."professorId" = p.id
        JOIN periods ON e."periodId" = periods.id;
    `)

    return result.rows;
}


async function create(examParams){
    const {year,professorId,subjectId,periodId,URL} = examParams;

    await connection.query(`
        INSERT INTO exams (year,"professorId","subjectId","periodId","URL")
        VALUES ($1,$2,$3,$4,$5)
    `,[year,professorId,subjectId,periodId,URL]);
}

async function getPeriods(){
    const result = await connection.query(`SELECT * FROM periods`);
    return result.rows;
}

async function getSubjects(){
    const result = await connection.query('SELECT * FROM subjects');
    return result.rows;
}

async function getProfessors(){
    const result = await connection.query('SELECT * FROM professors');
    return result.rows;
}

async function getSubjectsByProfessorId(professorId){
    const result = await connection.query(`
        SELECT s.*,p.name AS "professor" FROM subjects AS "s"
        JOIN professors AS "p" ON p.id = $1
        JOIN subject_professor AS "sp" ON sp."professorId" = p.id
        WHERE sp."subjectId" = s.id;
    `,[professorId]);

    return result.rows;
}

async function getProfessorsBySubjectId(subjectId){
    const result = await connection.query(`
        SELECT p.*,s.name AS "subject" FROM professors AS "p"
        JOIN subjects AS "s" ON s.id = $1
        JOIN subject_professor AS "sp" ON sp."subjectId" = s.id
        WHERE sp."professorId" = p.id;
    `,[subjectId]);

    return result.rows;
}

module.exports = {
    getAll,
    create,
    getPeriods,
    getProfessors,
    getSubjects,
    getSubjectsByProfessorId,
    getProfessorsBySubjectId
}
