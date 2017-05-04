'use strict'

const Lucid = use('Lucid')

class Signature extends Lucid {

    users() {
        return this.belongsTo('App/Model/User')
    }

    forms() {
        return this.belongsTo('App/Model/Form')
    }
}

module.exports = Signature
