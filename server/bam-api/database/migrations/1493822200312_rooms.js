'use strict'

const Schema = use('Schema')

class RoomsTableSchema extends Schema {

  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('name')
      table.string('number')
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }

}

module.exports = RoomsTableSchema
