'use strict'
const Room = use('App/Model/Room')
const Item = use('App/Model/Item')
const Database = use('Database')


class RoomsController {

  * index(request, response) {
    const _form = request.all().form_id

    const rooms = yield Database
      .raw('select lots.id, rooms.number, rooms.name, rooms.id from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id inner join rooms on rooms.lot_id = lots.id where forms.id = ? and lots.main_home = true group by rooms.name, rooms.id, rooms.number, lots.id', _form)

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
    let newRoom = yield Room.create({
      lot_id: lot_id[0][0].id,
      name: room_name,
      number: room_number
    })

    if (_form.type == 'room') {
      room_name = 'Séjour'
      newRoom.name = 'Séjour'
      yield newRoom.save()
      const itemsRoom = ['Clé porte', 'Interrupteurs', 'Prises', 'Prise TV/Radio', 'Prise internet/TV fibre', 'Porte', 'Plafond', 'Murs', 'Sol', 'Plinthes', 'Seuil', 'Peintures/Bois', 'Fenêtres intérieurs', 'Fenêtres extérieurs', 'Protection solaire', 'Manivelle', 'Radiateur']

      for (let i = 0; i < itemsRoom.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsRoom[i],
          comment: '',
          matter: ''
        })
      }
    }
    if (_form.type == 'balcon') {
      room_name = 'Balcon'
      newRoom.name = 'Balcon'
      yield newRoom.save()
      const itemsRoom = ['Plafond', 'Murs', 'Garde-corps', 'Sol', 'Protection solaire', 'Manivelle']

      for (let i = 0; i < itemsRoom.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsRoom[i],
          comment: '',
          matter: ''
        })
      }
    }
    if (_form.type == 'bedroom') {
      room_name = 'Chambre'
      newRoom.name = 'Chambre'
      yield newRoom.save()
      const itemsRoom = ['Clé porte', 'Interrupteurs', 'Prises', 'Prise TV/Radio', 'Prise internet/TV fibre', 'Porte', 'Plafond', 'Murs', 'Sol', 'Plinthes', 'Seuil', 'Peintures/Bois', 'Fenêtres intérieurs', 'Fenêtres extérieurs', 'Protection solaire', 'Manivelle', 'Radiateur']

      for (let i = 0; i < itemsRoom.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsRoom[i],
          comment: '',
          matter: ''
        })
      }
    }
    if (_form.type == 'kitchen') {
      room_name = 'Cuisine'
      newRoom.name = 'Cuisine'
      yield newRoom.save()
      const itemsRoom = ['Clé porte', 'Interrupteurs', 'Prises', 'Porte', 'Plafond', 'Murs', 'Sol', 'Plinthes', 'Faïences', 'Seuil', 'Peintures/Bois', 'Fenêtres intérieurs', 'Fenêtres extérieurs', 'Plan de travails', 'Armoires', 'Rayons', 'Portes', 'Meuble bas', 'Rayons', 'Portes', 'Tiroires', 'Meuble haut', 'Rayons', 'Portes', 'Prise force', 'Gaz', 'Evier', 'Robinetterie', 'Ventilation', 'Luminaire', 'Hotte', 'Cuisinière' ,'Réfrigérateur', 'Radiateur']

      for (let i = 0; i < itemsRoom.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsRoom[i],
          comment: '',
          matter: ''
        })
      }
    }
    if (_form.type == 'bath') {
      room_name = 'Salle de bains'
      newRoom.name = room_name
      yield newRoom.save()
      const itemsWC = ['Porte', 'Plafond', 'Murs', 'Faïences', 'Sol', 'Plinthes', 'Seuil', 'Peintures/Bois', ' Fenêtres intérieurs', 'Fenêtres extérioeurs', 'Ventilation', 'Luminaires', 'Radiateurs', 'Porte-savon', 'Porte-verres', 'Baignoire', 'Douche/Flexible', 'Robinnetterie douche', 'Lavabo', 'Robinetterie lavabo', 'Cuvette WC', 'Cuvette WC siège', 'Cuvette WC couverte', 'Réservoir d\eau', 'Porte-papier', 'Pharmacie', 'Glace', 'Galerie', 'Porte-linge', 'Clé de porte', 'Interrupteurs', 'Prises']

      for (let i = 0; i < itemsWC.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsWC[i],
          comment: '',
          matter: ''
        })
      }
    }
    if (_form.type == 'hall') {
      room_name = 'Hall d\'entrée'
      newRoom.name = room_name
      yield newRoom.save()
      const itemsHall = ['Sonnette', 'Verrou de porte', 'Clé porte', 'Interrupteurs', 'Prises', 'Tableau électrique', 'Porte', 'Plafond', 'Mur', 'Sol', 'Plinthes', 'Peintures', 'Seuil', 'Armoires', 'Rayons', 'Portes']

      for (let i = 0; i < itemsHall.length; i++) {
        let newItem = yield Item.create({
          room_id: newRoom.id,
          statu_id: 2,
          number: 1,
          name: itemsHall[i],
          comment: '',
          matter: ''
        })
      }
    }


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

    const deletePictures = yield Database
      .raw('delete pictures from pictures inner join items on items.id = pictures.item_id inner join rooms on rooms.id = items.room_id where rooms.id = ?', _id)
    const deleteItems = yield Database
      .raw('delete items from items inner join rooms on rooms.id = items.room_id where rooms.id = ?', _id)
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
