'use strict'

const Lucid = use('Lucid')

class Energy extends Lucid {

    consumptions() {
        return this.hasMany('App/Model/Consumption')
    }
}

module.exports = Energy
