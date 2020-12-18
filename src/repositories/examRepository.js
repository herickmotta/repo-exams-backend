const { Connection } = require("pg");
const connection = require("../database");

async function getProfessorsSubject(){
    const result = await connection.query(`
        SELECT p.name as "pName",s.name as "sName" FROM professors as p 
        JOIN subject_professor as sp ON p.id = sp."professorId"
        JOIN subject as s ON sp."subjectId" = s.id; 
    `)
}
async function getAll(){
    const result = await connection.query(`
        SELECT e.id,e.year AS "year",p.name AS "professor",s.name AS "subject", periods.name as "period" FROM exams as "e"
        JOIN professors AS "p" ON p.id = e."professorId"
        JOIN subject AS "s" ON s.id = e."subjectId"
        JOIN periods ON periods.id = e."periodId";
    `)

    return result.rows;
}

async function create(examParams){
    const {year,professorId,subjectId,periodId} = examParams;

    await connection.query(`
        INSERT INTO exams (year,professorId,subjectId,periodId)
        VALUES ($1,$2,$3,$4)
    `,[year,professorId,subjectId,periodId]);
}

module.exports = {
    getAll,
    create
}
