'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.resource('forms', 'FormsController')
Route.resource('buildings', 'BuildingsController')
Route.resource('floors', 'FloorsController')
Route.resource('lots', 'LotsController')
Route.resource('users', 'UserController')
Route.resource('signatures', 'SignatureController')
Route.resource('rooms', 'RoomsController')
Route.resource('items', 'ItemsController')
Route.resource('energy', 'EnergyController')
