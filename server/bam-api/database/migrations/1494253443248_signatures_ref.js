'use strict'

const Schema = use('Schema')

class SignaturesTableSchema extends Schema {

  up () {
    this.table('signatures', (table) => {
      // alter signatures table
      table.integer('form_id').unsigned().index().references('id').inTable('forms')
      table.integer('user_id').unsigned().index().references('id').inTable('users')
    })
  }

  down () {
    this.table('signatures', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = SignaturesTableSchema
