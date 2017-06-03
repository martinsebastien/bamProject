'use strict'
const Signature = use('App/Model/Signature')
const Database = use('Database')

class SignatureController {

    * index(request, response) {
        //
        const idUser = request.all().idUser
        const idForm = request.all().idForm

        yield response
            .json()
            .catch('Something went wrong with indexing the floors')
    }

    * create(request, response) {
        //
    }

    * store(request, response) {

        const _signature = request.all()

        const existingSignature = yield Database
            .raw('select * from signatures where user_id = ? and form_id = ?', [_signature.user_id, _signature.form_id])

        if (existingSignature[0].length) {
            yield response
                .json({'error': 'Vous avez déjà validé une signature pour cet utilisateur'})
                .catch('Something went wrong with indexing the floors')
        }

        let newSignature = yield Signature.create({
            user_id: parseInt(_signature.user_id),
            form_id: parseInt(_signature.form_id),
            image: _signature.image
        })

        yield response
            .json({'response': 'Signature enregistrée avec succès !'})
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
        //
    }

}

module.exports = SignatureController
