'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
    /*
    const addresses = yield Factory.model('App/Model/Address').create(10)
    const buildings = yield Factory.model('App/Model/Building').create(10)
    const cities = yield Factory.model('App/Model/City').create(10)
    const consumptions = yield Factory.model('App/Model/Consumption').create(10)
    const users = yield Factory.model('App/Model/User').create(10)
    //const constracts = yield Factory.model('App/Model/Contract').create(50)
    const countries = yield Factory.model('App/Model/Country').create(10)
    const floors = yield Factory.model('App/Model/Floor').create(10)
    const forms = yield Factory.model('App/Model/Form').create(10)
    const items = yield Factory.model('App/Model/Item').create(10)
    const lots = yield Factory.model('App/Model/Lot').create(10)
    const provinces = yield Factory.model('App/Model/Province').create(10)
    const roles = yield Factory.model('App/Model/Role').create(10)
    const rooms = yield Factory.model('App/Model/Room').create(10)
    const signatures = yield Factory.model('App/Model/Signature').create(10)
    const status = yield Factory.model('App/Model/Statu').create(10)
    const streets = yield Factory.model('App/Model/Street').create(10)
    const titles = yield Factory.model('App/Model/Title').create(10)
    const types = yield Factory.model('App/Model/Type').create(10)
    const energies = yield Factory.model('App/Model/Energy').create(10)
    */

    const users = yield Factory.model('App/Model/User').create(5)

    users.each(function * (user) {
      const address = Factory.model('App/Model/Address').make()
      const title = Factory.model('App/Model/Title').make()
      const role = Factory.model('App/Model/Role').make()
      const street = Factory.model('App/Model/Street').make()
      const city = Factory.model('App/Model/City').make()
      const province = Factory.model('App/Model/Province').make()
      const country = Factory.model('App/Model/Country').make()

      yield country.provinces().save(province)
      yield province.cities().save(street)
      yield street.address().save(address)
      yield address.users().save(user)

      const form = Factory.model('App/Model/Form').make()
    })


  }

}

module.exports = DatabaseSeeder
