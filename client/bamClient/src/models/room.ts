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
        
        const r = new Room;
        r.id = id;
        r.name = name;
        r.number = number;
        r.items = items.map(item => Item.build(item));
        return r;
    }

}