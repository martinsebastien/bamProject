'use strict'

const Schema = use('Schema')

class AdressesTableSchema extends Schema {

  up () {
    this.create('adresses', (table) => {
      table.increments()
      table.string('number')
      table.string('line')
      table.timestamps()
    })
  }

  down () {
    this.drop('adresses')
  }

}

module.exports = AdressesTableSchema
