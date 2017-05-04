'use strict'

const Lucid = use('Lucid')

class Country extends Lucid {

    provinces() {
        return this.hasMany('App/Model/Province')
    }
}

module.exports = Country
