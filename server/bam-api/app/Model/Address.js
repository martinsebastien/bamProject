'use strict'

const Lucid = use('Lucid')

class Address extends Lucid {

    users() {
        return this.hasMany('App/Model/User')
    }

    buildings() {
        return this.hasMany('App/Model/Building')
    }

    street() {
        return this.belongsTo('App/Model/Book')
    }
}

module.exports = Address
