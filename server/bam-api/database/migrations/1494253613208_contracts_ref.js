'use strict'

const Schema = use('Schema')

class ContractsTableSchema extends Schema {

  up () {
    this.table('contracts', (table) => {
      // alter contracts table
      table.integer('lot_id').unsigned().index().references('id').inTable('lots')
      table.integer('user_id').unsigned().index().references('id').inTable('users')
      table.integer('form_id').unsigned().index().references('id').inTable('forms')
    })
  }

  down () {
    this.table('contracts', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ContractsTableSchema
