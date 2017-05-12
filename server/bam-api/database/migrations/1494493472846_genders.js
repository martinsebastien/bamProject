'use strict'

const Schema = use('Schema')

class GendersTableSchema extends Schema {

  up () {
    this.create('genders', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('genders')
  }

}

module.exports = GendersTableSchema
