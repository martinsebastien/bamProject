'use strict'

const Schema = use('Schema')

class ItemsTableSchema extends Schema {

  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('number').nullable()
      table.text('comment', 'mediumtext').nullable()
      table.string('matter').nullable()
      table.softDeletes()
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }

}

module.exports = ItemsTableSchema
