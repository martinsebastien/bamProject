'use strict'

const Schema = use('Schema')

class BuildingsTableSchema extends Schema {

  up () {
    this.table('buildings', (table) => {
      // alter buildings table
      table.integer('addres_id').unsigned().index().references('id').inTable('addresses')
      table.integer('user_id').unsigned().index().references('id').inTable('users')
    })
  }

  down () {
    this.table('buildings', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = BuildingsTableSchema
