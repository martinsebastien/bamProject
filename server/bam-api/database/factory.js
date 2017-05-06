'use strict'

const Factory = use('Factory')

const rooms = ['Salle de bain', 'Cuisine', 'Chambre', 'Salon']
const items = ['Sonnette', 'Clés', 'Prises', 'Mure', 'Sol', 'Peintures', 'Plinthes']
const matters = ['Bois', 'Métal', 'Plâtre']
const status = ['En ordre', 'Usé', 'Détérioré']

Factory.blueprint('App/Model/Country', (fake) => {
  return {
    name: fake.country({full: true}),
    short_name: fake.country()
  }
})

Factory.blueprint('App/Model/Province', (fake) => {
  return {
    name: fake.province({full: true}),
    short_name: fake.province(),
  }
})

Factory.blueprint('App/Model/User', (fake) => {
  return {
    name: fake.last(),
    firstname: fake.first(),
    email: fake.email(),
    private_phone: fake.phone(),
    public_phone: fake.phone(),
    password: fake.password(),
    iban: `CH ${fake.natural({min: 1000, max: 9999})} ${fake.natural({min: 1000, max: 9999})} ${fake.natural({min: 1000, max: 9999})}`,
    reference_number: fake.string(),
  }
})

Factory.blueprint('App/Model/City', (fake) => {
  return {
    name: fake.city(),
    npa: fake.natural({min: 1000, max: 9999}),
  }
})

Factory.blueprint('App/Model/Street', (fake) => {
  return {
    name: fake.street(),
  }
})

Factory.blueprint('App/Model/Address', (fake) => {
  return {
    number: fake.natural({min: 1, max: 99}),
    line: fake.address(),
  }
})

Factory.blueprint('App/Model/Title', (fake) => {
  return {
    name: fake.prefix({full: true}),
    short_name: fake.prefix()
  }
})

Factory.blueprint('App/Model/Role', (fake) => {
  return {
    name: 'Locataire'
  }
})

Factory.blueprint('App/Model/Signature', (fake) => {
  return {
    image: fake.string(),
  }
})

Factory.blueprint('App/Model/Form', (fake) => {
  return {
    reference_number: fake.string(),
    date_signature: fake.date(),
  }
})

Factory.blueprint('App/Model/Building', (fake) => {
  return {
    name: fake.username(),
    code_entrance: fake.string({length: 4}),
  }
})

Factory.blueprint('App/Model/Floor', (fake) => {
  return {
    number: fake.integer({min: -2, max: 8}),
  }
})

Factory.blueprint('App/Model/Lot', (fake) => {
  return {
    number: fake.natural({min: 1, max: 40}),
  }
})

Factory.blueprint('App/Model/Type', (fake) => {
  return {
    name: fake.username()
  }
})

Factory.blueprint('App/Model/Consumption', (fake) => {
  return {
    number: fake.natural({min: 1000, max: 999999}),
    value: fake.natural({min: 1000, max: 999999})
  }
})

Factory.blueprint('App/Model/Energy', (fake) => {
  return {
    name: fake.word(),
    metric: 'm3'
  }
})

Factory.blueprint('App/Model/Room', (fake) => {
  return {
    name: rooms[fake.natural({min: 0, max: 3})],
    number: fake.natural({min: 0, max: 3}),
  }
})

Factory.blueprint('App/Model/Item', (fake) => {
  return {
    name: items[fake.natural({min: 0, max: 6})],
    number: fake.natural({min: 0, max: 3}),
    matter: matters[fake.natural({min: 0, max: 2})],
    comment: fake.sentence(),
  }
})

Factory.blueprint('App/Model/Statu', (fake) => {
  return {
    name: status[fake.natural({min: 0, max: 2})]
  }
})