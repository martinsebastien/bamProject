'use strict'

const Lucid = use('Lucid')

class Statu extends Lucid {

    items() {
        return this.hasMany('App/Model/Item')
    }
}

module.exports = Statu
