'use strict'

const Schema = use('Schema')

class ItemsTableSchema extends Schema {

  up () {
    this.table('items', (table) => {
      // alter items table
      table.integer('statu_id').unsigned().index().references('id').inTable('status')
      table.integer('room_id').unsigned().index().references('id').inTable('rooms')
    })
  }

  down () {
    this.table('items', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ItemsTableSchema
