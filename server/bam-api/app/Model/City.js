'use strict'

const Lucid = use('Lucid')

class City extends Lucid {

    province() {
        return this.belongsTo('App/Model/Province')
    }

    streets() {
        return this.hasMany('App/Model/Street')
    }

    forms() {
        return this.hasMany('App/Model/Form')
    }
}

module.exports = City
