let { Model, snakeCaseMappers } = require('objection');

class Faculty extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'faculty';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [

      ]
    }
  }

  static get relationMappings() {
    let Department = require('./Department');
    let Review = require('./Review');
    return {
      departments: {
        relation: Model.ManyToManyRelation,
        modelClass: Department,
        join: {
          from: 'faculty.id',
          through: {
            from: 'faculty_to_departments.faculty_id',
            to: 'faculty_to_departments.department_id'
          },
          to: 'departments.id'
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'faculty.id',
          to: 'reviews.faculty_id'
        }
      }
    }
  }
}

module.exports = Faculty;
