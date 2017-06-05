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
const Item = use('App/Model/Item')
const Type = use('App/Model/Type')
const Contract = use('App/Model/Contract')

class FormsController {

    * index(request, response) {

        // accept a param: completed. Note that the param is a boolean in string format. Should do completed == 'true' to test value
        const bool = request.all().completed
        const completed = bool == 'true' ? true : bool == 'false' ? false : bool
        let allState = yield this.requestUsers(2, completed)
        console.log(allState)

        yield response
            .json(allState[0])
            .catch('Something went wrong with indexing the forms')
    }

    * update(request, response) {
        const _id = request.all().id

        const form = yield Form.find(_id)
        form.completed = true
        yield form.save()
        console.log(form)

        let allState = yield this.requestUsers(2, true)

        yield response
            .json(allState[0])
            .catch('Something went wrong with indexing the forms')

    }

    * show(request, response) {
        //We receive an id form from the request
        //We send a JSON parsed to be easily used from the frontend (no need to map it)

        const state = {}
        const _id = parseInt(request.params().id)
        const form = yield Form.find(_id)
        const contract = yield Contract.findBy('form_id', _id)
        const genderForm = yield Gender.find(form.gender_id)
        const lots = yield Database
            .raw('select contracts.reference_number, lots.main_home, lots.id, lots.number, lots.floor_id, lots.type_id, types.name as lot_type from lots inner join contracts on contracts.lot_id = lots.id inner join types on types.id = lots.type_id where contracts.form_id = ? group by contracts.reference_number, lots.main_home, lots.id, lots.number, lots.floor_id, lots.type_id, lot_type ', _id)
        const users = yield Database
            .raw('select users.name as name, users.role_id as role, users.firstname as firstname, users.email as email, users.private_phone as private_phone, users.public_phone as public_phone, users.id from users inner join contracts on contracts.user_id = users.id where contracts.form_id = ? group by name, role, firstname, email, private_phone, public_phone, users.id', _id)
        const mainHome = yield Database
            .raw('select * from lots inner join contracts on contracts.lot_id = lots.id inner join floors on floors.id = lots.floor_id where contracts.form_id = ? and lots.main_home = true limit 1', _id)

        state.general = {}
        state.general.reference_number = contract.reference_number
        state.general.date = form.date
        state.general.gender = genderForm.name
        state.id = form.id
        state.users = users[0]
        state.signatures = []
        state.building = {}
        state.lots = []
        state.building.address = {}
        state.building.name = ''
        state.building.code = ''

        const buildingRaw = yield Database
            .raw('select buildings.id, buildings.name as name, buildings.user_id as proprio,buildings.code_entrance as code_entrance, buildings.addres_id, floors.number as floor, lots.number as flat_number from buildings inner join floors on floors.building_id = buildings.id inner join lots on lots.floor_id = floors.id where lots.id = 1', mainHome.id)
        const building = buildingRaw[0][0]
        const address = yield Address.find(building.addres_id)
        const street = yield Street.find(address.street_id)
        const city = yield City.find(street.city_id)
        const province = yield Province.find(city.province_id)
        const country = yield Country.find(province.country_id)
        let proprio = yield User.find(building.proprio)

        state.floor = building.floor
        state.flat_number = building.flat_number
        state.building.name = building.name
        state.building.code = building.code_entrance
        state.building.address.line = address.line
        state.building.address.street = street.name
        state.building.address.number = address.number
        state.building.address.npa = city.npa
        state.building.address.city = city.name
        state.building.address.province = province.short_name
        state.building.address.country = country.short_name

        const signaturesRaw = yield form.signatures().fetch()
        const signatures = signaturesRaw.toJSON()
        for (let s = 0; s < signatures.length; s++) {
            let signature = signatures[s]
            state.signatures[s] = {}
            state.signatures[s].image = signature.image
            state.signatures[s].created_at = signature.created_at
            state.signatures[s].user_id = signature.user_id
        }

        for (let n = 0; n < lots[0].length; n++) {
            let lot = lots[0][n]
            let floor_lot = yield Floor.find(lot.floor_id)

            state.lots[n] = {}
            state.lots[n].floor = floor_lot.number
            state.lots[n].main_home = lot.main_home
            state.lots[n].lot_type = lot.lot_type
            state.lots[n].rooms = []

            state.lots[n].consumptions = []
            let consumptions = yield Database
                .raw('select consumptions.number as number, consumptions.value as value, energy.name as name, energy.metric as metric from lots inner join consumptions on consumptions.lot_id = lots.id inner join energy on energy.id = consumptions.energy_id where lots.id = ?', lot.id)

            for (let c = 0; c < consumptions[0].length; c++) {
                let consumption = consumptions[0][c]
                state.lots[n].consumptions[c] = {}
                state.lots[n].consumptions[c].name = consumption.name
                state.lots[n].consumptions[c].metric = consumption.metric
                state.lots[n].consumptions[c].number = consumption.number
                state.lots[n].consumptions[c].value = consumption.value
            }

            const rooms = yield Database
                .raw('select rooms.name as name, rooms.id as id, rooms.number as number from rooms inner join lots on lots.id = rooms.lot_id where lots.id = ?', lot.id)

            for (let i = 0; i < rooms[0].length; i++) {
                console.log(rooms[0])
                let room = rooms[0][i]
                state.lots[n].rooms[i] = {}
                state.lots[n].rooms[i].items = []
                state.lots[n].rooms[i].id = room.id
                state.lots[n].rooms[i].name = room.name
                state.lots[n].rooms[i].number = room.number

                const items = yield Database
                    .table('items')
                    .where('items.room_id', room.id)

                for (let j = 0; j < items.length; j++) {
                    let item = items[j]
                    let statu = yield Database
                        .select('name')
                        .from('status')
                        .where('id', item.statu_id)

                    state.lots[n].rooms[i].items[j] = {}
                    state.lots[n].rooms[i].items[j].id = item.id
                    state.lots[n].rooms[i].items[j].name = item.name
                    state.lots[n].rooms[i].items[j].number = item.number
                    state.lots[n].rooms[i].items[j].comment = item.comment
                    state.lots[n].rooms[i].items[j].matter = item.matter
                    state.lots[n].rooms[i].items[j].statu = statu[0].name
                    state.lots[n].rooms[i].items[j].pictures = yield Database
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
        yield response.json({ 'ok': 'ok' })
    }

    * store(request, response) {
        //Create a new state 
        //If there is a previous state we have to generate a new state based on the old one.
        //we receive an array of user and an array of lot
        const _users = request.all().users
        const _lots = request.all().lots
        if (!_users.length || !_lots.length) {
            return response
                .json({ 'error': 'Action impossible: Afin de créer un nouvel état des lieux il est nécessaire d\'avoir au moins un locataire et un lot' })
                .catch('Something went wrong')
        }
        const lots_id = _lots.map(lot => lot.id)
        const users_id = _users.map(user => user.id)

        const oldFormsUncomplete = yield Database
            .raw('select * from forms inner join contracts on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id where lots.id in (?)', lots_id.join(', '))

        for (let o = 0; o < oldFormsUncomplete[0].length; o++) {
            const oldForm = oldFormsUncomplete[0][o]
            if (!oldForm.completed) {
                return response
                    .json({ 'error': 'Action impossible: Il existe un état des lieux non complété pour un ou plusieurs des lots sélectionnés.' })
                    .catch('Something went wrong')
            }
        }

        const firstUser = yield User.find(_users[0].id)
        const firstLot = yield Lot.find(_lots[0].id)
        const firstFloor = yield Floor.find(firstLot.floor_id)
        const firstBuilding = yield Building.find(firstFloor.building_id)
        const firstAddress = yield Address.find(firstBuilding.addres_id)
        const firstStreet = yield Street.find(firstAddress.street_id)
        const firstCity = yield City.find(firstStreet.city_id)
        const rawGender = yield this.checkLastForm(_lots[0].id)

        const _gender = rawGender[0][0] ? rawGender[0][0].gender_id : -1

        const newGender = _gender == 2 ? 1 : 2

        let ref_supp = ''
        let ref_number = []
        let newLots = []


        let newForm = yield Form.create({
            city_id: firstCity.id,
            gender_id: newGender,
            completed: false
        })

        let existMain = false;
        for (let l = 0; l < lots_id.length; l++) {
            const _id = lots_id[l]
            const lot = yield Lot.find(_id)

            lot.main_home == true ? existMain = true : existMain;

            let newLot = yield Lot.create({
                type_id: lot.type_id,
                floor_id: lot.floor_id,
                main_home: lot.main_home,
                number: lot.number
            })
            console.log(newLot.main_home)

            newLots.push(newLot)

            for (let u = 0; u < users_id.length; u++) {
                let newContract = yield Contract.create({
                    lot_id: newLot.id,
                    user_id: users_id[u],
                    form_id: newForm.id
                })
                ref_number.push(newContract.id)
                ref_supp = ref_number[0]
                let reference_number = `${firstUser.name.substring(0, 3).toUpperCase()}-${firstBuilding.name.substring(0, 3).toUpperCase()}-${ref_supp}`
                newContract.reference_number = reference_number
                yield newContract.save()
                console.log(newContract.reference_number)
            }

            const _rooms = yield Database
                .raw('select * from rooms where rooms.lot_id = ?', lot.id)

            for (let r = 0; r < _rooms[0].length; r++) {
                const room = _rooms[0][r]

                let newRoom = yield Room.create({
                    name: room.name,
                    lot_id: newLot.id,
                    number: room.number
                })

                const _items = yield Database
                    .raw('select * from items where items.room_id = ?', room.id)

                for (let i = 0; i < _items[0].length; i++) {
                    const item = _items[0][i]

                    let newItem = yield Item.create({
                        name: item.name,
                        room_id: newRoom.id,
                        number: item.number,
                        comment: item.comment,
                        matter: item.matter,
                        statu_id: item.statu_id
                    })
                }
            }
        }

         if (existMain == false) {
             newLots[0].main_home = true
             yield newLots[0].save()
         } 

        const lots = yield Database
            .raw('select * from lots inner join rooms on rooms.lot_id = lots.id inner join items on items.room_id = rooms.id where lots.id in (?)', lots_id.join(", "))

        yield response
            .json({ 'response': 'Etat des lieux créé avec succès !' })
            .catch('Something went wrong with the generation of the form')
    }

    checkLastForm(lotId) {
        const lastForm = Database
            .raw('select forms.gender_id from contracts inner join forms on forms.id = contracts.form_id where contracts.lot_id = ? and (forms.gender_id = 1 or forms.gender_id = 2) order by forms.created_at desc limit 1', lotId)
        return lastForm
    }

    requestUsers(role, completed) {
        let base = Database
            .raw('select users.name, users.firstname, users.id, users.email, users.private_phone, users.public_phone, contracts.form_id, contracts.reference_number, floors.number as floor, lots.number, addresses.number as street_number, addresses.line, streets.name as street, cities.name as city, cities.npa from contracts inner join forms on contracts.form_id = forms.id inner join lots on lots.id = contracts.lot_id inner join floors on floors.id = lots.floor_id inner join buildings on buildings.id = floors.building_id inner join addresses on addresses.id = buildings.addres_id inner join streets on streets.id = addresses.street_id inner join cities on cities.id = streets.city_id inner join users on users.id = contracts.user_id where forms.completed = ? and main_home = true and users.role_id = ? group by users.name, users.firstname, users.id, users.email, users.private_phone, users.public_phone, contracts.form_id, contracts.reference_number, floor, lots.number, street_number, addresses.line, street, city, cities.npa', [completed, role])

        return base
    }

}

module.exports = FormsController
