'use strict'
const Room = use('App/Model/Room')
const Database = use('Database')


class RoomsController {

  * index(request, response) {
    const _form = request.all().form_id

    const rooms = yield Database
      .raw('select lots.id, rooms.number, rooms.name, rooms.id from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id inner join rooms on rooms.lot_id = lots.id where forms.id = ? and lots.main_home = true group by rooms.name, rooms.id, rooms.number, lots.id', _form)
    console.log(rooms[0])

    yield response
      .json(rooms[0])
      .catch('Something went wrong with indexing the floors')
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const _form = request.all()

    const lot_id = yield Database
      .raw('select lots.id from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id where forms.id = ? and lots.main_home = true group by lots.id limit 1', _form.form)

    const room_number_raw = yield Database
      .raw('select count(rooms.id) as number_rooms from rooms where lot_id = ?', lot_id[0][0].id)

    const room_number = room_number_raw[0][0].number_rooms + 1
    let room_name = ''
    if (_form.type == 'room') {
      room_name = 'Séjour'
    } else {
      room_name = _form.type
    }
    if (_form.type == 'bath') {
      room_name = 'Salle de bains'
    }
    if (_form.type == 'hall') {
      room_name = 'Hall d\'entrée'
    }

    let newRoom = yield Room.create({
      lot_id: lot_id[0][0].id,
      name: room_name,
      number: room_number
    })

    console.log(newRoom)

    const rooms = yield Database
      .raw('select lots.id, rooms.number, rooms.name, rooms.id from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id inner join rooms on rooms.lot_id = lots.id where forms.id = ? and lots.main_home = true group by rooms.name, rooms.id, rooms.number, lots.id', _form.form)

    yield response
      .json(rooms[0])
      .catch('Something went wrong with indexing the floors')
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    const _id = parseInt(request.params().id)

    const _lot = yield Database
      .raw('select lots.id from lots inner join rooms on rooms.lot_id = lots.id where rooms.id = ?', _id)

    const lot = _lot[0][0].id

    const _form = yield Database
      .raw('select forms.id from lots inner join contracts on contracts.lot_id = lots.id inner join forms on forms.id = contracts.form_id where lots.id = ?', lot)

    const form = _form[0][0].id

    const deleteRoom = yield Database
      .raw('delete from rooms where id = ?', _id)

    const rooms = yield Database
      .raw('select lots.id, rooms.number, rooms.name, rooms.id from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id inner join rooms on rooms.lot_id = lots.id where forms.id = ? and lots.main_home = true group by rooms.name, rooms.id, rooms.number, lots.id', form)
      
    yield response
      .json(rooms[0])
      .catch('Something went wrong with indexing the floors')

  }

}

module.exports = RoomsController
