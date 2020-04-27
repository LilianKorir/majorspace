let { Model, snakeCaseMappers } = require('objection');

class Review extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'reviews';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'userId',
        'courseId',
        'departmentId',
        'facultyId',
        'review',
      ],
      properties: {
        id: {type: 'integer'},
        // More properties go here
      }
    }
  }

  static get relationMappings() {
    let User = require('./User');
    let Faculty = require('./Faculty');
    let Course = require('./Course');
    let Department = require('./Department');
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from : 'reviews.user_id',
          to: 'users.id'
        }
      },
      course: {
        relation: Model.HasOneRelation,
        modelClass: Course,
        join: {
          from: 'reviews.course_id',
          to: 'courses.id'
        }
      },
      department: {
        relation: Model.HasOneRelation,
        modelClass: Department,
        join: {
          from: 'reviews.department_id',
          to: 'departments.id'
        }
      },
      faculty: {
        relation: Model.HasOneRelation,
        modelClass: Faculty,
        join: {
          from: 'reviews.faculty_id',
          to: 'faculty.id'
        }
      }
    }
  }
}
