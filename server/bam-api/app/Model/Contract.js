'use strict'

const Lucid = use('Lucid')

class Contract extends Lucid {

    user() {
        return this.belongsTo('App/Model/User')
    }

    form() {
        return this.belongsTo('App/Model/Form')
    }

    lot() {
        return this.belongsTo('App/Model/Lot')
    }
}

module.exports = Contract
