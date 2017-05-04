'use strict'

const Lucid = use('Lucid')

class Province extends Lucid {

    country() {
        return this.belongsTo('App/Model/Country')
    }

    cities() {
        return this.hasMany('App/Model/City')
    }
 }

module.exports = Province
