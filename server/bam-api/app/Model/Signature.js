'use strict'

const Lucid = use('Lucid')

class Signature extends Lucid {

    user() {
        return this.belongsTo('App/Model/User')
    }

    forms() {
        return this.belongsTo('App/Model/Form')
    }
}

module.exports = Signature
