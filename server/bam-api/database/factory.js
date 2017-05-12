'use strict'

const Factory = use('Factory')

const rooms = ['Salle de bain', 'Cuisine', 'Chambre', 'Salon']
const items = ['Sonnette', 'Clés', 'Prises', 'Mure', 'Sol', 'Peintures', 'Plinthes']
const matters = ['Bois', 'Métal', 'Plâtre']
const status = ['En ordre', 'Usé', 'Détérioré']
const gender = ['Etat des lieux: Entrée', 'Etat des lieux: Sortie']

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
    date: fake.date()
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

Factory.blueprint('App/Model/Contract', (fake) => {
  return {

  }
})

Factory.blueprint('App/Model/Statu', (fake) => {
  return {
    name: status[fake.natural({min: 0, max: 2})]
  }
})

Factory.blueprint('App/Model/Gender', (fake) => {
  return {
    name: gender[fake.natural({min: 0, max: 1})]
  }
})

Factory.blueprint('App/Model/Picture', (fake) => {
  return {
    image: 'data:image/png;base64,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m3'
  }
})
