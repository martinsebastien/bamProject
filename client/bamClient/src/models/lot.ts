import { Room } from './room';

export class Lot {

    public rooms: Room[];
    public floor: number;
    public main_home: boolean;
    public lot_type: string;
    public json: any;

    static build(data: any): Lot {
        console.log(data);
        const {
            rooms = [],
            floor,
            main_home,
            lot_type,
        } = data;

        const l = new Lot;
        l.json = data;
        l.main_home = main_home;
        l.lot_type = lot_type;
        l.rooms = rooms.map(room => Room.build(room));
        l.floor = floor;
        return l;
    }
}