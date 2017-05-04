'use strict'

const Lucid = use('Lucid')

class Building extends Lucid {

    address() {
        return this.belongsTo('App/Model/Address')
    }

    user() {
        return this.belongsTo('App/Model/Address')
    }

    floors() {
        return this.hasMany('App/Model/Floor')
    }

    lots() {
        return this.hasManyThrough('App/Model/Lot')
    }
}

module.exports = Building
