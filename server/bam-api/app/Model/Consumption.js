'use strict'

const Lucid = use('Lucid')

class Consumption extends Lucid {

    lot() {
        return this.belongsTo('App/Model/Lot')
    }

    energy() {
        return this.belongsTo('App/Model/Energy')
    }
}

module.exports = Consumption
