update lots set main_home = false;
update lots set main_home = true where id=1;
update lots set floor_id = 1;

update users set role_id = 2;

update contracts set contracts.form_id = 1;
update contracts set reference_number = 'ABC-123-DEF';
update contracts set lot_id = 1, user_id = 2 where id=3;
update contracts set lot_id = 2, user_id = 1 where id=4;
update contracts set lot_id = 3, user_id = 2 where id=5;
/*insert into contracts(reference_number, lot_id, user_id, form_id) value ('ABC-123-DEF', 3,1,1);*/
update contracts set lot_id = 3, user_id = 1 where id=6;

/* Add lot types and link them with two lots */
insert into types (name) value ('Garage');
insert into types (name) value ('Locale externe');
insert into types (name) value ('Grenier');
update lots set type_id = 2 where id = 2;
update lots set type_id = 4 where id = 3;

/* Sets the energy */
/*insert into energy (name, metric) value ('Elec. HP', 'KWH');
insert into energy (name, metric) value ('Elec. HC', 'KWH');
insert into energy (name, metric) value ('Mazout', 'm3');
insert into energy (name, metric) value ('DIFC', 'm3');
insert into energy (name, metric) value ('Eau froide', 'm3');*/
update energy set name='Eau chaude' where id = 1;

select * from lots;