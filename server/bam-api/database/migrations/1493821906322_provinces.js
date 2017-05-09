'use strict'

const Schema = use('Schema')

class ProvincesTableSchema extends Schema {

  up () {
    this.create('provinces', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('short_name').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('provinces')
  }

}

module.exports = ProvincesTableSchema
