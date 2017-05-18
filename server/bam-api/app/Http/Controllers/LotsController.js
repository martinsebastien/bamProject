'use strict'
const Lot = use('App/Model/Lot')
const Database = use('Database')

class LotsController {

  * index(request, response) {
    //
    const idFloor = request.all().idFloor

    const allLots = yield Database
      .table('lots')
      .where('floor_id', idFloor)

    yield response
      .json(allLots)
      .catch('Something went wrong with indexing the forms')
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
