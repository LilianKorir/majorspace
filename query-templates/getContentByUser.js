let User = require('../models/User');

async function getReviewsByUser(id) {
  let user = User.query().findById(id);
  let reviews = user.$relatedQuery('reviews');
  return reviews;
}

module.exports = {
  getReviewsByUser
}
