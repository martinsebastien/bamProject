'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {

    room() {
        return this.belongsTo('App/Model/Room')
    }

    statu() {
        return this.belongsTo('App/Model/Statu')
    }
}

module.exports = Item
