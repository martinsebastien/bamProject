'use strict'

class FormsController {

    * index (request, response) {
        yield response
                .json({
                    'Formulaire': 'This one',
                    'It worked': 'Very well'
                })
                .catch('Something went wrong with indexing the forms')
    }

}

module.exports = FormsController
