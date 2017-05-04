'use strict'

const Lucid = use('Lucid')

class Address extends Lucid {

    users() {
        return this.hasmany('App/Model/User')
    }

    street() {
        return this.belongsTo('App/Model/Book')
    }
}

module.exports = Address
