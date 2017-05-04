'use strict'

const Schema = use('Schema')

class StatusTableSchema extends Schema {

  up () {
    this.create('status', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('status')
  }

}

module.exports = StatusTableSchema
