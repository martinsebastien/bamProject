'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    title() {
        return this.belongsTo('App/Model/Title')
    }

    role() {
        return this.belongsTo('App/Model/Role')
    }

    address() {
        return this.belongsTo('App/Model/Address')
    }

    signatures() {
        return this.hasMany('App/Model/Signature')
    }

    contracts() {
        return this.hasMany('App/Model/Contract')
    }

    buildings() {
        return this.hasMany('App/Model/Building')
    }
}

module.exports = User
