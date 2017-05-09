'use strict'

const Schema = use('Schema')

class RoomsTableSchema extends Schema {

  up () {
    this.table('rooms', (table) => {
      // alter rooms table
      table.integer('lot_id').unsigned().index().references('id').inTable('lots')
    })
  }

  down () {
    this.table('rooms', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = RoomsTableSchema
