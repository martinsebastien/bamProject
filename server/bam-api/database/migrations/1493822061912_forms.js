'use strict'

const Schema = use('Schema')

class FormsTableSchema extends Schema {

  up () {
    this.create('forms', (table) => {
      table.increments()
      table.string('reference_number').nullable()
      table.dateTime('date_signature').nullable()
      table.dateTime('date').nullable()
      table.softDeletes()
      table.timestamps()
    })
  }

  down () {
    this.drop('forms')
  }

}

module.exports = FormsTableSchema
