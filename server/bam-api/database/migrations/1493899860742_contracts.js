'use strict'

const Schema = use('Schema')

class ContractsTableSchema extends Schema {

  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.string('reference_number').nullable()
      table.softDeletes()
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }

}

module.exports = ContractsTableSchema
