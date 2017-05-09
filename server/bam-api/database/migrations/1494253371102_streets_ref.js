'use strict'

const Schema = use('Schema')

class StreetsTableSchema extends Schema {

  up () {
    this.table('streets', (table) => {
      // alter streets table
      table.integer('city_id').unsigned().index().references('id').inTable('cities')
    })
  }

  down () {
    this.table('streets', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = StreetsTableSchema
