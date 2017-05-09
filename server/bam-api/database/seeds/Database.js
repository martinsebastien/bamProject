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

    const users = yield Factory.model('App/Model/User').create(5)
    const title = yield Factory.model('App/Model/Title').create()
    const role = yield Factory.model('App/Model/Role').create()
    const energy = yield Factory.model('App/Model/Energy').create()

    const proprio = Factory.model('App/Model/User').make()
    const type = Factory.model('App/Model/Type').make()
    const statu = Factory.model('App/Model/Statu').make()

    yield type.save()
    yield proprio.save()
    yield statu.save()

    users.each(function * (user) {
      const address = Factory.model('App/Model/Address').make()
      const title = Factory.model('App/Model/Title').make()
      const role = Factory.model('App/Model/Role').make()
      const street = Factory.model('App/Model/Street').make()
      const city = Factory.model('App/Model/City').make()
      const province = Factory.model('App/Model/Province').make()
      const country = Factory.model('App/Model/Country').make()

      const signature = Factory.model('App/Model/Signature').make()
      const form = Factory.model('App/Model/Form').make()
      const contract = Factory.model('App/Model/Contract').make()

      const lot = Factory.model('App/Model/Lot').make()
      const building = Factory.model('App/Model/Building').make()
      const floor = Factory.model('App/Model/Floor').make()
      const consumption = Factory.model('App/Model/Consumption').make()

      const rooms = yield Factory.model('App/Model/Room').create(4)

      yield floor.save()
      yield lot.save()
      yield address.save()
      yield title.save()
      yield role.save()
      yield street.save()
      yield city.save()
      yield province.save()
      yield country.save()
      yield signature.save()
      yield form.save()
      yield building.save()
      yield consumption.save()

      rooms.each(function * (room) {
        yield room.save()
        yield lot.rooms().save(room)
        const items = yield Factory.model('App/Model/Item').create(10)

        items.each(function * (item){
          const picture = Factory.model('App/Model/Picture').make()
          yield item.pictures().save(picture)
          yield room.items().save(item)
          yield statu.items().save(item)
        })
      })

      yield floor.lots().save(lot)
      yield type.lots().save(lot)

      yield country.provinces().save(province)
      yield province.cities().save(city)
      yield city.streets().save(street)
      yield street.addresses().save(address)
      yield address.users().save(user)
      yield address.buildings().save(building)
      yield title.users().save(user)
      yield role.users().save(user)

      yield city.forms().save(form)
      yield lot.contracts().save(contract)
      yield user.contracts().save(contract)
      yield form.contracts().save(contract)
      yield form.signatures().save(signature)
      yield user.signatures().save(signature)

      yield proprio.buildings().save(building)
      yield building.floors().save(floor)
      yield lot.consumptions().save(consumption)
    })


  }

}

module.exports = DatabaseSeeder
