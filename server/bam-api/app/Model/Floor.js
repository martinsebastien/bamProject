'use strict'

const Lucid = use('Lucid')

class Floor extends Lucid {

    building() {
        return this.belongsTo('App/Model/Building')
    }

    lots() {
        return this.hasMany('App/Model/Lot')
    }
}

module.exports = Floor
