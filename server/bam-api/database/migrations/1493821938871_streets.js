'use strict'

const Schema = use('Schema')

class StreetsTableSchema extends Schema {

  up () {
    this.create('streets', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('streets')
  }

}

module.exports = StreetsTableSchema
