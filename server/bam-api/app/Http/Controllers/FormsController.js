'use strict'

const Database = use('Database')
const Floor = use('App/Model/Floor')
const Building = use('App/Model/Building')
const Address = use('App/Model/Address')
const Street = use('App/Model/Street')
const Province = use('App/Model/Province')
const City = use('App/Model/City')
const Country = use('App/Model/Country')
const User = use('App/Model/User')
const Form = use('App/Model/Form')
const Gender = use('App/Model/Gender')
const Lot = use('App/Model/Lot')
const Room = use('App/Model/Room')
const Type = use('App/Model/Type')
const Contract = use('App/Model/Contract')

class FormsController {

    * index(request, response) {

        const allState = yield Database
            .table('users')
            .innerJoin('contracts', 'users.id', 'contracts.user_id')
            .orderBy('users.name')

        yield response
            .json(allState)
            .catch('Something went wrong with indexing the forms')
    }

    * show(request, response) {
        //We receive an id form from the request

        const state = {}
        const _id = parseInt(request.params().id)
        const form = yield Form.find(_id)
        const genderForm = yield Gender.find(form.gender_id)
        const lots = yield Database
            .select('*')
            .from('contracts')
            .join('lots', 'contracts.lot_id', '=', 'lots.id')
            .where('contracts.form_id', _id)

        state.general = {}
        state.general.reference = form.reference_number
        state.general.date = form.date
        state.general.gender = genderForm.name
        state.users = yield Database
            .table('users')
            .innerJoin('contracts', 'contracts.form_id', _id)
            .groupBy('contracts.user_id')
        state.signatures = {}
        state.lots = {}

        const signaturesRaw = yield form.signatures().fetch()
        const signatures = signaturesRaw.toJSON()
        for(let s = 0; s < signatures.length; s++) {
            let signature = signatures[s]
            console.log(signature.image)
            state.signatures[signature.id] = {}
            state.signatures[signature.id].image = signature.image
            state.signatures[signature.id].created_at = signature.created_at
            state.signatures[signature.id].user_id = signature.user_id
        }

        for (let n = 0; n < lots.length; n++) {
            let lot = lots[n]
            state.lots[lot.id] = {}
            state.lots[lot.id].building = {}
            state.lots[lot.id].building.name = ''
            state.lots[lot.id].building.code = ''
            state.lots[lot.id].building.address = {}
            state.lots[lot.id].rooms = {}

            let floor = yield Floor.find(lot.floor_id)
            let building = yield Building.find(floor.building_id)
            let address = yield Address.find(building.addres_id)
            let street = yield Street.find(address.street_id)
            let city = yield City.find(street.city_id)
            let province = yield Province.find(city.province_id)
            let country = yield Country.find(province.country_id)
            let proprio = yield User.find(building.user_id)

            state.lots[lot.id].floor = floor.number
            state.lots[lot.id].building.name = building.name
            state.lots[lot.id].building.code = building.code_entrance
            state.lots[lot.id].building.address.line = address.line
            state.lots[lot.id].building.address.street = street.name
            state.lots[lot.id].building.address.number = address.number
            state.lots[lot.id].building.address.npa = city.npa
            state.lots[lot.id].building.address.city = city.name
            state.lots[lot.id].building.address.province = province.short_name
            state.lots[lot.id].building.address.country = country.short_name

            const rooms = yield Database
                .table('lots')
                .innerJoin('contracts', 'contracts.form_id', _id)
                .innerJoin('rooms', 'rooms.lot_id', 'contracts.lot_id')
                .groupBy('rooms.id')
                .orderBy('rooms.number')

            for (let i = 0; i < rooms.length; i++) {
                let room = rooms[i]
                state.lots[lot.id].rooms[room.id] = {}
                state.lots[lot.id].rooms[room.id].items = {}
                state.lots[lot.id].rooms[room.id].id = room.id
                state.lots[lot.id].rooms[room.id].name = room.name
                state.lots[lot.id].rooms[room.id].number = room.number

                const items = yield Database
                    .table('items')
                    .where('items.room_id', room.id)

                for (let j = 0; j < items.length; j++) {
                    let item = items[j]
                    let statu = yield Database
                        .select('name')
                        .from('status')
                        .where('id', item.statu_id)

                    state.lots[lot.id].rooms[room.id].items[item.id] = {}
                    state.lots[lot.id].rooms[room.id].items[item.id].id = item.id
                    state.lots[lot.id].rooms[room.id].items[item.id].name = item.name
                    state.lots[lot.id].rooms[room.id].items[item.id].number = item.number
                    state.lots[lot.id].rooms[room.id].items[item.id].comment = item.comment
                    state.lots[lot.id].rooms[room.id].items[item.id].matter = item.matter
                    state.lots[lot.id].rooms[room.id].items[item.id].statu = statu[0].name
                    state.lots[lot.id].rooms[room.id].items[item.id].pictures = yield Database
                        .select('*')
                        .from('pictures')
                        .where('item_id', item.id)
                }
            }
        }

        yield response
            .json(state)
            .catch('Something went wrong with showing the form')
    }

    * create(request, response) {
        yield response.json({'ok':'ok'})
    }

    * store(request, response) {
        const lots = JSON.parse(request.all().lots)
        const users = JSON.parse(request.all().users)
        const form = new Form()
        yield form.save()

        for(let i = 0; i < lots.length; i++) {
            const _id = lots[i]
            const lot = yield Lot.find(_id)
            const rooms = yield Room.query().where('lot_id', _id)

            const newLot = new Lot()
            newLot.number = lot.number
            yield newLot.save()

            const contract = new Contract()
            yield contract.save()
            yield contract.lot().save(newLot)
            yield contract.form().save(form)

            for(let j = 0; j < users.length; j++) {
                const user = yield User.find(users[j])
                yield contract.user().save(user)
            }

            yield Floor.find(lot.floor_id).lots().save(newLot)
            yield Type.find(lot.type_id).lots().save(newLot)
            
            for(let room in rooms) {
                room = rooms[room]
                console.log(room)
            }
        }

        yield response
            .json(lots)
            .catch('Somthing went wrong with the generation of the form')
    }

}

module.exports = FormsController
