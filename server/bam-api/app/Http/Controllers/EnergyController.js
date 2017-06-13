'use strict'
const Energy = use('App/Model/Energy')
const Consumption = use('App/Model/Consumption')
const Database = use('Database')

class EnergyController {

  * index(request, response) {
    const _lot = request.all().lot_id
    const consumptions = yield Database
      .raw('select * from energy inner join consumptions on consumptions.energy_id = energy.id inner join lots on lots.id = consumptions.lot_id where lots.id = ?', _lot)
      console.log(consumptions[0])
    yield response
      .json(consumptions[0])
      .catch('Something went wrong with indexing the floors')
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    console.log(request.all())
    const lot = request.all().id

    let newItem = yield Item.create({
      room_id: room,
      name: 'Autre',
      number: 1,
      matter: '',
      comment: '',
      statu_id: 2
    })

    const items = yield Database
      .raw('select status.name as statu, items.name as name, items.matter, items.comment, items.number, items.id from items inner join status on status.id = items.statu_id where room_id = ?', room)

    yield response
      .json(items[0])
      .catch('Something went wrong with indexing the floors')
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    const item = request.all()
    const editedItem = yield Item.find(item.id)

    item.name ? editedItem.name = item.name : item
    item.matter ? editedItem.mattert = item.matter : item
    item.statu_id ? editedItem.statu_id = item.statu_id : item
    item.number ? editedItem.number = item.number : item
    item.comment ? editedItem.comment = item.comment : item

    yield editedItem.save()

    const _room = yield Database
      .raw('select rooms.id from items inner join rooms on rooms.id = items.room_id where items.id = ?', item.id)

    const room = _room[0][0].id

    const items = yield Database
      .raw('select status.name as statu, items.name as name, items.matter, items.comment, items.number, items.id from items inner join status on status.id = items.statu_id where room_id = ?', room)

    yield response
      .json(items[0])
      .catch('Something went wrong with indexing the floors')
  }

  * destroy(request, response) {
    //
  }

}

module.exports = EnergyController
