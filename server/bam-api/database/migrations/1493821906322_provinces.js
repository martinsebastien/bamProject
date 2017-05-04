'use strict'

const Schema = use('Schema')

class ProvincesTableSchema extends Schema {

  up () {
    this.create('provinces', (table) => {
      table.increments()
      table.string('name')
      table.string('short_name')
      table.timestamps()
    })
  }

  down () {
    this.drop('provinces')
  }

}

module.exports = ProvincesTableSchema
