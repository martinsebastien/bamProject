'use strict'

const Schema = use('Schema')

class CountriesTableSchema extends Schema {

  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('name')
      table.string('short_name')
      table.timestamps()
    })
  }

  down () {
    this.drop('countries')
  }

}

module.exports = CountriesTableSchema
