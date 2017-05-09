'use strict'

const Schema = use('Schema')

class ConsumptionsTableSchema extends Schema {

  up () {
    this.create('consumptions', (table) => {
      table.increments()
      table.integer('number').nullable()
      table.integer('value').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('consumptions')
  }

}

module.exports = ConsumptionsTableSchema
