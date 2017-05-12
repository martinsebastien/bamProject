'use strict'

const Schema = use('Schema')

class FormsTableSchema extends Schema {

  up () {
    this.table('forms', (table) => {
      table.integer('gender_id').unsigned().index().references('id').inTable('genders')
    })
  }

  down () {
    this.table('forms', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FormsTableSchema
