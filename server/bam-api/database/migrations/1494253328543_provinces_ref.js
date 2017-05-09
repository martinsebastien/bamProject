'use strict'

const Schema = use('Schema')

class ProvincesTableSchema extends Schema {

  up () {
    this.table('provinces', (table) => {
      // alter provinces table
      table.integer('country_id').unsigned().index().references('id').inTable('countries')
    })
  }

  down () {
    this.table('provinces', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ProvincesTableSchema
