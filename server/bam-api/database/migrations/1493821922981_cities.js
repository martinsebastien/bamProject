'use strict'

const Schema = use('Schema')

class CitiesTableSchema extends Schema {

  up () {
    this.create('cities', (table) => {
      table.increments()
      table.string('npa').notNullable()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }

}

module.exports = CitiesTableSchema
