'use strict'

const Schema = use('Schema')

class ItemsTableSchema extends Schema {

  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name')
      table.integer('number')
      table.text('comment', 'mediumtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }

}

module.exports = ItemsTableSchema
