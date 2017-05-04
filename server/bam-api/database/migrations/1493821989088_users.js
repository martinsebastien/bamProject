'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name')
      table.string('firstname')
      table.string('email').unique()
      table.string('private_phone')
      table.string('public_phone')
      table.string('iban')
      table.string('reference_number')
      table.string('password')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
