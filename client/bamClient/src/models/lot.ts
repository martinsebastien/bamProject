import { User } from './user';
import { Room } from './room';
import { Building } from './building';

export class Lot {

    public building: Building;
    public rooms: Room[];
    public floor: number;
    public json: any;

    static build(data: any): Lot {

        const {
            building,
            rooms,
            floor,
        } = data;

        const [blocks = []] = rooms;

        const l = new Lot;
        l.json = data;
        l.building = Building.build(building);
        l.rooms = blocks.map(block => Room.build(block));
        l.floor = floor;
        return l;
    }
}