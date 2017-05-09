'use strict'

const Schema = use('Schema')

class CitiesTableSchema extends Schema {

  up () {
    this.table('cities', (table) => {
      // alter cities table
      table.integer('province_id').unsigned().index().references('id').inTable('provinces')
    })
  }

  down () {
    this.table('cities', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = CitiesTableSchema
