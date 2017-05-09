'use strict'

const Schema = use('Schema')

class LotsTableSchema extends Schema {

  up () {
    this.table('lots', (table) => {
      // alter lots table
      table.integer('floor_id').unsigned().index().references('id').inTable('floors')
      table.integer('type_id').unsigned().index().references('id').inTable('types')
    })
  }

  down () {
    this.table('lots', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = LotsTableSchema
