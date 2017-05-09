'use strict'

const Schema = use('Schema')

class PicturesTableSchema extends Schema {

  up () {
    this.table('pictures', (table) => {
      // alter pictures table
      table.integer('item_id').unsigned().index().references('id').inTable('items')
    })
  }

  down () {
    this.table('pictures', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = PicturesTableSchema
