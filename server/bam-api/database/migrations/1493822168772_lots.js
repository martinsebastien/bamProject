'use strict'

const Schema = use('Schema')

class LotsTableSchema extends Schema {

  up () {
    this.create('lots', (table) => {
      table.increments()
      table.string('number')
      table.timestamps()
    })
  }

  down () {
    this.drop('lots')
  }

}

module.exports = LotsTableSchema
