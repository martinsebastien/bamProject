'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {

  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RolesTableSchema
