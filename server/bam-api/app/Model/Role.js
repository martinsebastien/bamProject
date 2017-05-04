'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {

    users() {
        return this.hasMany('App/Model/User')
    }
}

module.exports = Role
