let { Model, snakeCaseMappers } = require('objection');

class Course extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'courses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'departmentId',
        'courseNumber',
        'courseTitle'
      ],
      properties: {
        id: {type: 'integer'},
        departmentId: {type: 'integer'},
        courseNumber: {type: 'string'},
        courseTitle: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    let Department = require('./Department');
    return {
      departments: {
        relation: Model.HasOneRelation,
        modelClass: Department,
        join: {
          from: 'courses.department_id',
          to: 'departments.id'
        }
      }
    }
  }
}

module.exports = Course;
