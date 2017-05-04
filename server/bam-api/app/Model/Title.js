'use strict'

const Lucid = use('Lucid')

class Title extends Lucid {

    users() {
        return this.hasMany('App/Model/User')
    }
}

module.exports = Title
