'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      // alter users table
      table.integer('addres_id').unsigned().index().references('id').inTable('addresses')
      table.integer('title_id').unsigned().index().references('id').inTable('titles')
      table.integer('role_id').unsigned().index().references('id').inTable('roles')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersTableSchema
