'use strict'

const Schema = use('Schema')

class AddressesTableSchema extends Schema {

  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('number').nullable()
      table.string('line').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }

}

module.exports = AddressesTableSchema
