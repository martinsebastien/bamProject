'use strict'

const Schema = use('Schema')

class LotsTableSchema extends Schema {

  up () {
    this.table('lots', (table) => {
      // alter lots table
      table.boolean('main_home')
    })
  }

  down () {
    this.table('lots', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = LotsTableSchema
