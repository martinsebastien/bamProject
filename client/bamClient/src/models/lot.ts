import { Room } from './room';
import { Consumption } from './consumption';

export class Lot {

    public rooms: Room[];
    public id: number;
    public floor: number;
    public main_home: boolean;
    public lot_type: string;
    public consumptions: Consumption[];
    public number: number;
    public building_name: string;
    public line: string;
    public address_number: string;
    public street: string;
    public city: string;
    public npa: number;
    public json: any;

    static build(data: any): Lot {

        const {
            rooms = [],
            id,
            floor,
            main_home,
            lot_type,
            consumptions,
            number,
            building_name,
            line,
            address_number,
            street,
            city,
            npa,
        } = data;

        const l = new Lot;
        l.json = data;
        l.id = id;
        l.main_home = main_home;
        l.lot_type = lot_type;
        rooms ? l.rooms = rooms.map(room => Room.build(room)) : l;
        consumptions ? l.consumptions = consumptions.map(consumption => Consumption.build(consumption)): l;
        l.floor = floor;
        l.number = number;
        l.building_name = building_name;
        l.line = line;
        l.address_number = address_number;
        l.street = street;
        l.city = city;
        l.npa = npa;
        return l;
    }
}