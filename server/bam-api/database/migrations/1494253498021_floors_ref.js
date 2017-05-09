'use strict'

const Schema = use('Schema')

class FloorsTableSchema extends Schema {

  up () {
    this.table('floors', (table) => {
      // alter floors table
      table.integer('building_id').unsigned().index().references('id').inTable('buildings')
    })
  }

  down () {
    this.table('floors', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FloorsTableSchema
