'use strict'

const Schema = use('Schema')

class FormsTableSchema extends Schema {

  up () {
    this.table('forms', (table) => {
      table.boolean('completed')
    })
  }

  down () {
    this.table('forms', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FormsTableSchema
