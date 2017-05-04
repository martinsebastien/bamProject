'use strict'

const Lucid = use('Lucid')

class Lot extends Lucid {

    floor() {
        return this.belongsTo('App/Model/Floor')
    }

    type() {
        return this.belongsTo('App/Model/Type')
    }

    contracts() {
        return this.hasMany('App/Model/Contract')
    }

    consumptions() {
        return this.hasMany('App/Model/Consumption')
    }

    rooms() {
        return this.hasMany('App/Model/Room')
    }
}

module.exports = Lot
