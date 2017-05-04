'use strict'

const Lucid = use('Lucid')

class Room extends Lucid {

    lot() {
        return this.belongsTo('App/Model/Lot')
    }

    items() {
        return this.hasMany('App/Model/Item')
    }
}

module.exports = Room
