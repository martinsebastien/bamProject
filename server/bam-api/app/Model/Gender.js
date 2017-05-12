'use strict'

const Lucid = use('Lucid')

class Gender extends Lucid {

    forms() {
        return this.hasMany('App/Model/Form')
    }

}

module.exports = Gender
