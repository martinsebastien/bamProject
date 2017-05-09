'use strict'

const Schema = use('Schema')

class ConsumptionsTableSchema extends Schema {

  up () {
    this.table('consumptions', (table) => {
      // alter consumptions table
      table.integer('lot_id').unsigned().index().references('id').inTable('lots')
      table.integer('energy_id').unsigned().index().references('id').inTable('energy')
    })
  }

  down () {
    this.table('consumptions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ConsumptionsTableSchema
