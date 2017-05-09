'use strict'

const Lucid = use('Lucid')

class Picture extends Lucid {

    item() {
        return this.belongsTo('App/Model/Item')
    }
}

module.exports = Picture
