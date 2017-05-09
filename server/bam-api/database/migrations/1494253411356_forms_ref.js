'use strict'

const Schema = use('Schema')

class FormsTableSchema extends Schema {

  up () {
    this.table('forms', (table) => {
      // alter forms table
      table.integer('city_id').unsigned().index().references('id').inTable('cities')
    })
  }

  down () {
    this.table('forms', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FormsTableSchema
