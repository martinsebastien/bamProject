'use strict'

const Schema = use('Schema')

class CountriesTableSchema extends Schema {

  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('short_name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('countries')
  }

}

module.exports = CountriesTableSchema
