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

        // accept a param: completed. Note that the param is a boolean in string format. Should do completed == 'true' to test value
        const bool = request.all().completed
        const completed = bool == 'true' ? true : bool == 'false' ? false : bool
        let allState = yield this.requestUsers(2, completed)

        yield response
            .json(allState)
            .catch('Something went wrong with indexing the forms')
    }

    * show(request, response) {
        //We receive an id form from the request
        //We send a JSON parsed to be easily used from the frontend (no need to map it)

        const state = {}
        const _id = parseInt(request.params().id)
        const form = yield Form.find(_id)
        const contract = yield Contract.find(form.id)
        const genderForm = yield Gender.find(form.gender_id)
        const lots = yield Database
            .raw('select contracts.reference_number, lots.main_home, lots.id, lots.number, lots.floor_id, lots.type_id, types.name as lot_type from lots inner join contracts on contracts.lot_id = lots.id inner join types on types.id = lots.type_id where contracts.form_id = ? group by contracts.reference_number, lots.main_home, lots.id, lots.number, lots.floor_id, lots.type_id, lot_type ', _id)
        const users = yield Database
            .raw('select users.name as name, users.firstname as firstname, users.email as email, users.private_phone as private_phone, users.public_phone as public_phone, users.id from users inner join contracts on contracts.user_id = users.id where contracts.form_id = 1 and users.role_id = ? group by id', 2)
        const mainHome = yield Database
            .raw('select * from lots inner join contracts on contracts.lot_id = lots.id inner join floors on floors.id = lots.floor_id where contracts.form_id = ? and lots.main_home = true limit 1', _id)

        state.general = {}
        state.general.reference_number = contract.reference_number
        state.general.date = form.date
        state.general.gender = genderForm.name
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

            const rooms = yield Database
                .raw('select rooms.name as name, rooms.id as id, rooms.number as number from rooms inner join lots on lots.id = rooms.lot_id where lots.id = ?', lot.id)

            for (let i = 0; i < rooms[0].length; i++) {
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
        console.log(state.lots)

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
        //If there is no previous state, create a new one based on a template
        //we receive an array of user id and an array of lot id
        const lots = JSON.parse(request.all().lots)
        const users = JSON.parse(request.all().users)
        const firstLot = yield Lot.find(lots[0])
        const genderEnter = yield Gender.find(1)
        const genderExit = yield Gender.find(2)

        //We create a new form
        const form = new Form()
        form.date = new Date()
        form.completed = false
        yield form.save()

        const lastContractQuery = yield Database
            .raw('select * from lots inner join contracts on contracts.lot_id = lots.id inner join forms on forms.id = contracts.form_id where lot_id = ? and (forms.gender_id = ? or forms.gender_id = ?) order by forms.created_at desc limit 1', [lots[0], 1, 2])
        const lastContract = yield Contract.find(lastContractQuery[0][0].id)
        const lastForm = yield lastContract.form().fetch()

        //Depending on if the form of the last contract is an exit or enter form
        if (lastForm) {
            console.log(lastForm.gender_id)
            lastForm.gender_id == 1 ? yield genderExit.forms().save(form) : yield genderEnter.forms().save(form)
        }

        //For all the lots selected for the state
        for (let i = 0; i < lots.length; i++) {
            const _id = lots[i]
            const lot = yield Lot.find(_id)
            const rooms = yield Room.query().where('lot_id', _id)
            const floor = yield Floor.find(lot.floor_id)
            const type = yield Type.find(lot.type_id)
            const building = yield Building.find(floor.building_id)
            const newLot = new Lot()
            newLot.number = lot.number
            yield newLot.save()

            //For all users/tenant for the form
            for (let j = 0; j < users.length; j++) {
                const user = yield User.find(users[j])

                //We create a new contract in any case
                const contract = new Contract()
                form.gender_id == 0 ? contract.reference_number = `${users[0].name[0]}${users[0].firstname[0]}-${building.name}-${contract.id}` : contract.reference_number = lastContract.reference_number
                yield newLot.contracts().save(contract)
                yield form.contracts().save(contract)
                yield user.contracts().save(contract)
                yield contract.save()
            }

            yield floor.lots().save(newLot)
            yield type.lots().save(newLot)

            for (let room in rooms) {
                room = rooms[room]
            }
        }

        yield response
            .json(lots)
            .catch('Something went wrong with the generation of the form')
    }

    //The two functions below are used to prefill fields for the state (all rooms and items for a given lot)
    createStateAccordingToOldOne(contract) {
        return this
    }

    createBrandNewState(contract) {
        const enterState = Gender.find(0)

        return this
    }

    requestUsers(role, completed) {
        let base = Database
            .debug()
            .select('users.name as name', 'users.id', 'users.firstname', 'users.email', 'users.private_phone', 'users.public_phone', 'contracts.form_id', 'floors.number as floor', 'lots.number as flat_number', 'addresses.number as street_number', 'line', 'npa', 'cities.name as city')
            .from('users')
            .innerJoin('contracts', 'contracts.user_id', 'users.id')
            .innerJoin('lots', 'lots.id', 'contracts.lot_id')
            .innerJoin('floors', 'floors.id', 'lots.floor_id')
            .innerJoin('buildings', 'buildings.id', 'floors.building_id')
            .innerJoin('addresses', 'addresses.id', 'buildings.addres_id')
            .innerJoin('streets', 'streets.id', 'addresses.street_id')
            .innerJoin('cities', 'cities.id', 'streets.city_id')
            .innerJoin('forms', 'forms.id', 'contracts.form_id')
            .where('users.role_id', role)
            .andWhere('lots.main_home', true)

        completed !== undefined && base.andWhere('forms.completed', completed)

        return base.groupByRaw('contracts.reference_number, users.id, name, users.firstname, users.email, users.private_phone, users.public_phone, contracts.form_id, floor, flat_number, street_number, line, npa, city')
    }

}

module.exports = FormsController
