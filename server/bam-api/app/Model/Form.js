'use strict'

const Lucid = use('Lucid')

class Form extends Lucid {

    signatures() {
        return this.hasMany('App/Model/Signature')
    }

    city() {
        return this.belongsTo('App/Model/City')
    }

    contracts() {
        return this.hasMany('App/Model/Contract')
    }
}

module.exports = Form
