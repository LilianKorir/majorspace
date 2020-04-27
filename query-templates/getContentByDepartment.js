let Department = require('../models/Department');

async function getReviewsByDepartment(name) {
  let department = await Department.query().findOne({name: name});
  let reviews = department.$relatedQuery('reviews');
  return reviews;
}

async function getCoursesByDepartment(name) {
  let department = await Department.query().findOne({name: name});
  let courses = department.$relatedQuery('courses');
  return courses;
}

async function getFacultyByDepartment(name) {
  let department = await Department.query().findOne({name: name});
  let faculty = department.$relatedQuery('faculty');
  return faculty;
}

async function getLinksByDepartment(name) {
  let department = await Department.query().findOne({name: name});
  let links = department.$relatedQuery('links');
  return links;
}

async function getUsersByDepartment(name) {
  let department = await Department.query().findOne({name: name});
  let users = await department.$relatedQuery('users');
  return users;
}

module.exports = {
  getCoursesByDepartment,
  getFacultyByDepartment,
  getLinksByDepartment,
  getReviewsByDepartment,
  getUsersByDepartment
}
