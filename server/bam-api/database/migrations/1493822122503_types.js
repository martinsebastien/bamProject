'use strict'

const Schema = use('Schema')

class TypesTableSchema extends Schema {

  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
  }

}

module.exports = TypesTableSchema
