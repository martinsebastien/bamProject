'use strict'

const Schema = use('Schema')

class AddressesTableSchema extends Schema {

  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('number')
      table.string('line')
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }

}

module.exports = AddressesTableSchema
