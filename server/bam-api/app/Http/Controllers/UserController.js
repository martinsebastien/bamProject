'use strict'

class UserController {

  * index(request, response) {
    const allUser = yield User.all()

    yield response
      .json(allUser)
      .catch('Something went wrong with indexing the users')
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

module.exports = UserController
