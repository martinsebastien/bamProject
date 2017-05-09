'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {

    room() {
        return this.belongsTo('App/Model/Room')
    }

    statu() {
        return this.belongsTo('App/Model/Statu')
    }

    pictures() {
        return this.hasMany('App/Model/Picture')
    }
}

module.exports = Item
