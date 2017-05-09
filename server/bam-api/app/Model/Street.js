'use strict'

const Lucid = use('Lucid')

class Street extends Lucid {

    addresses() {
        return this.hasMany('App/Model/Address')
    }

    city() {
        return this.belongsTo('App/Model/City')
    }
}

module.exports = Street
