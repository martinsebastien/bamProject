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
        return this.belongsTo('App/Model/Street')
    }

    city() {
        return this.street().city()
    }

    province() {
        return this.street().city().province()
    }

    country() {
        return this.street().city().province().country()
    }
}

module.exports = Address
