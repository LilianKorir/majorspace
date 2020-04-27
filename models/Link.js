let { Model, snakeCaseMappers } = require('objection');

class Link extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'department_links';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'label',
        'url'
      ],
      properties: {
        id: {type: 'integer'},
        departmentId: {type: 'integer'},
        label: {type: 'string'},
        url: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    let Department = require('./Department');
    return {
      department: {
        relation: Model.HasOneRelation,
        modelClass: Department,
        join: {
          from: 'department_links.department_id',
          to: 'departments.id'
        }
      }
    }
  }
}

module.exports = Link;
