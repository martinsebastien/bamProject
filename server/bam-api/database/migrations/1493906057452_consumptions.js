'use strict'

const Schema = use('Schema')

class ConsumptionsTableSchema extends Schema {

  up () {
    this.create('consumptions', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('consumptions')
  }

}

module.exports = ConsumptionsTableSchema
