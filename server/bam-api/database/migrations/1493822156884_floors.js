'use strict'

const Schema = use('Schema')

class FloorsTableSchema extends Schema {

  up () {
    this.create('floors', (table) => {
      table.increments()
      table.string('number').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('floors')
  }

}

module.exports = FloorsTableSchema
