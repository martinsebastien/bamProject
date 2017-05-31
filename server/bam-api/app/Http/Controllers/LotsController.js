'use strict'
const Lot = use('App/Model/Lot')
const Database = use('Database')

class LotsController {

  * index(request, response) {
    //
    //const idFloor = request.all().idFloor
    const allLots = yield Database
      .raw('select flats.id as id, flats.number as number, floors.id as floor_id, floors.number as floor, buildings.id as building_id, buildings.name as building, addresses.line as line, addresses.number as address_number, streets.name as street, cities.npa as npa, cities.name as city, types.name as lot_type from lots as flats inner join floors on floors.id = flats.floor_id inner join types on types.id = flats.type_id inner join buildings on buildings.id = floors.building_id inner join addresses on addresses.id = buildings.addres_id inner join streets on streets.id = addresses.street_id inner join cities on cities.id = streets.city_id where flats.created_at = (select max(lots.created_at) from lots where flats.floor_id = lots.floor_id and flats.number = lots.number);')

    yield response
      .json(allLots[0])
      .catch('Something went wrong with indexing the lots')
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
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
    //
  }

}

module.exports = LotsController
