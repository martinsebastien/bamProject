'use strict'
const Building = use('App/Model/Building')

class BuildingsController {

  * index(request, response) {
    //
    const allBuilding = yield Building.all()

    yield response
      .json(allBuilding)
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

module.exports = BuildingsController
