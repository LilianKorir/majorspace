const { Model, snakeCaseMappers } = require('objection');
const Password = require('objection-password')();

class User extends Password(Model) {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'password',
        'firstName',
        'lastName',
        'classYear'
      ],
      properties: {
        id: {type: 'integer'},
        email: {type: 'string'},
        password: {type: 'string'},
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        classYear: {type: 'integer'},
        availableAsMentor: {type: 'boolean'}
      }
    }
  }

  static get relationMappings() {
    let Review = require('./Review');
    let Course = require('./Course');
    let Department = require('./Department');
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'users.id',
          to: 'reviews.user_id'
        }
      },
      departments: {
        relation: Model.ManyToManyRelation,
        modelClass: Department,
        join: {
          from: 'users.id',
          through: {
            from: 'users_to_departments.user_id',
            to: 'users_to_departments.department_id',
          },
          to: 'departments.id'
        }
      },
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: 'users.id',
          through: {
            from: 'users_to_courses.user_id',
            to: 'users_to_courses.course_id',
          },
          to: 'courses.id'
        }
      }
    }
  }
}

module.exports = User;
