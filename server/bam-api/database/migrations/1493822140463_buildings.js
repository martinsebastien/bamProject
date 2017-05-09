'use strict'

const Schema = use('Schema')

class BuildingsTableSchema extends Schema {

  up () {
    this.create('buildings', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('code_entrance').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('buildings')
  }

}

module.exports = BuildingsTableSchema
