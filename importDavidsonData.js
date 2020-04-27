let fs = require('fs');
let Knex = require('knex');
let { Model } = require('objection');
let dbConfig = require('./knexfile');

let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

let Department = require('./models/Department');
let Faculty = require('./models/Faculty');

let data = JSON.parse(fs.readFileSync('./web-scraping/davidsonDepartments.json', 'utf-8'));
console.log(data);
async function importDavidsonDepartments(data) {
  return await Department.query().insertGraph(data.map(dept => {
    return {
      name: dept.name,
      departmentUrl: dept.departmentUrl,
      links: dept.links
    }
  }), {relate: true});
}

async function importDavidsonFaculty(data) {
  for (let department of data) {
    if (department.faculty) {
      let dbDepartment = await Department.query().findOne({name: department.name});
      for (let member of department.faculty) {
        let dbMember;
        try {
          dbMember = await Faculty.query().insert(member);
        } catch {
          dbMember = await Faculty.query().findOne({name: member.name});
        }
        await dbMember.$relatedQuery('departments').relate(dbDepartment);
      }
    }
  }
}

(async () => {
  await(importDavidsonDepartments(data));
  await(importDavidsonFaculty(data));
})();
