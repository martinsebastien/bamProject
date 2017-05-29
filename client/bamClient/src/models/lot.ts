import { Room } from './room';
import { Consumption } from './consumption'

export class Lot {

    public rooms: Room[];
    public floor: number;
    public main_home: boolean;
    public lot_type: string;
    public consumptions: Consumption[];
    public json: any;

    static build(data: any): Lot {
        console.log(data);
        const {
            rooms = [],
            floor,
            main_home,
            lot_type,
            consumptions,
        } = data;

        const l = new Lot;
        l.json = data;
        l.main_home = main_home;
        l.lot_type = lot_type;
        l.rooms = rooms.map(room => Room.build(room));
        l.consumptions = consumptions.map(consumption => Consumption.build(consumption));
        l.floor = floor;
        return l;
    }
}