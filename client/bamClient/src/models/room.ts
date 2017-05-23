import { Item } from './item';


export class Room {

    public id: number;
    public name: string;
    public number: number;
    public items: Item[];


    static build(data: any): Room {

        const {
            items = [],
            name,
            number,
            id,
        } = data;

        const [objects = []] = items;
        
        const r = new Room;
        r.id = id;
        r.name = name;
        r.number = number;
        r.items = objects.map(object => Item.build(object));
        return r;
    }

}