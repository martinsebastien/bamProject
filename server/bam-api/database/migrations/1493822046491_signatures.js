'use strict'

const Schema = use('Schema')

class SignaturesTableSchema extends Schema {

  up () {
    this.create('signatures', (table) => {
      table.increments()
      table.text('image', 'longtext').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('signatures')
  }

}

module.exports = SignaturesTableSchema
