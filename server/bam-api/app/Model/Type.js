'use strict'

const Lucid = use('Lucid')

class Type extends Lucid {

    lots() {
        return this.hasMany('App/Model/Lot')
    }
}

module.exports = Type
