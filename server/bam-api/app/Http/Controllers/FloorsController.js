'use strict'
const Floor = use('App/Model/Floor')

class FloorsController {

  * index(request, response) {
    //
    const idBuilding = request.all().idBuilding

    const allFloors = yield Floor.findBy('building_id', idBuilding)

    yield response
      .json(allFloors)
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

module.exports = FloorsController
