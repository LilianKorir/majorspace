const { Model, snakeCaseMappers } = require('objection');

class Department extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'departments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'departmentUrl'
      ],
      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        departmentUrl: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    let Faculty = require('./Faculty');
    let Link = require('./Link');
    let Course = require('./Course');
    let Review = require('./Review');
    let User = require('./User');
    return {
      faculty: {
        relation: Model.ManyToManyRelation,
        modelClass: Faculty,
        join: {
          from: 'departments.id',
          through: {
            from: 'faculty_to_departments.department_id',
            to: 'faculty_to_departments.faculty_id'
          },
          to: 'faculty.id'
        }
      },
      links: {
        relation: Model.HasManyRelation,
        modelClass: Link,
        join: {
          from: 'departments.id',
          to: 'department_links.department_id'
        }
      },
      courses: {
        relation: Model.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'departments.id',
          to: 'courses.department_id'
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'departments.id',
          to: 'reviews.department_id'
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'departments.id',
          through: {
            from: 'users_to_departments.department_id',
            to: 'users_to_departments.user_id'
          },
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Department;
