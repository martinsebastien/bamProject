'use strict'

const Schema = use('Schema')

class AddressesTableSchema extends Schema {

  up () {
    this.table('addresses', (table) => {
      // alter addresses table
      table.integer('street_id').unsigned().index().references('id').inTable('streets')
    })
  }

  down () {
    this.table('addresses', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = AddressesTableSchema
