'use strict'

const Schema = use('Schema')

class PicturesTableSchema extends Schema {

  up () {
    this.create('pictures', (table) => {
      table.increments()
      table.text('image', 'longtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('pictures')
  }

}

module.exports = PicturesTableSchema
