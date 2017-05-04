'use strict'

const Schema = use('Schema')

class FormsTableSchema extends Schema {

  up () {
    this.create('forms', (table) => {
      table.increments()
      table.string('reference_number')
      table.dateTime('date_signature')
      table.dateTime('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('forms')
  }

}

module.exports = FormsTableSchema
