'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table.string('email').notNullable().unique()
      table.string('private_phone').nullable()
      table.string('public_phone').nullable()
      table.string('iban').nullable()
      table.string('reference_number').nullable()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
