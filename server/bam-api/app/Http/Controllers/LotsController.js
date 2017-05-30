'use strict'
const Lot = use('App/Model/Lot')
const Database = use('Database')

class LotsController {

  * index(request, response) {
    //
    //const idFloor = request.all().idFloor
    const allLots = yield Database
      .raw('select lots.id as id, lots.number as number, types.name as lot_type, floors.number as floor, buildings.name as building_name, addresses.line as line, addresses.number as address_number, streets.name as street, cities.name as city, cities.npa as npa from lots inner join floors on floors.id = lots.floor_id inner join buildings on buildings.id = floors.building_id inner join addresses on addresses.id = building_id inner join streets on streets.id = addresses.street_id inner join cities on cities.id = streets.city_id inner join types on types.id = lots.type_id group by number, lot_type, floor, building_name, line, address_number, street, city, npa, id')

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
