'use strict'

const Schema = use('Schema')

class EnergiesTableSchema extends Schema {

  up () {
    this.create('energies', (table) => {
      table.increments()
      table.string('name')
      table.string('metric')
      table.timestamps()
    })
  }

  down () {
    this.drop('energies')
  }

}

module.exports = EnergiesTableSchema
