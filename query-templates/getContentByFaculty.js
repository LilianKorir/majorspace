const Faculty = require('../models/Faculty');

async function getReviewsByFaculty(name) {
  let faculty = await Faculty.query().findOne({name: name});
  let reviews = await faculty.$relatedQuery('reviews');
  return reviews;
}

module.exports = {
  getReviewsByFaculty
}
