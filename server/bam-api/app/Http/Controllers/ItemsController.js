'use strict'
const Item = use('App/Model/Item')
const Database = use('Database')

class ItemsController {

  * index(request, response) {
    const _room = request.all().room_id
    const items = yield Database
      .raw('select status.name as statu, items.name as name, items.matter, items.comment, items.number, items.id from items inner join status on status.id = items.statu_id where room_id = ?', _room)

    yield response
      .json(items[0])
      .catch('Something went wrong with indexing the floors')
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
    console.log(request.all())
    const room = request.all().id

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
  }

  * update(request, response) {
    //
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
    const _id = request.params().id

    const _room = yield Database
      .raw('select rooms.id from items inner join rooms on rooms.id = items.room_id where items.id = ?', _id)

    const room = _room[0][0].id

    const deletePictures = yield Database
      .raw('delete pictures from pictures inner join items on items.id = pictures.item_id where pictures.item_id = ?', _id)
    const deleteItem = yield Database
      .raw('delete from items where id = ?', _id)

    const items = yield Database
      .raw('select status.name as statu, items.name as name, items.matter, items.comment, items.number, items.id from items inner join status on status.id = items.statu_id where room_id = ?', room)

    yield response
      .json(items[0])
      .catch('Something went wrong with indexing the floors')
  }

}

module.exports = ItemsController
