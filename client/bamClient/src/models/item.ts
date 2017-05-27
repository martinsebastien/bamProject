import { Picture } from './picture';

export class Item {

    public id: number;
    public name: string;
    public number: number;
    public comment: string;
    public matter: string;
    public statu: string;
    public pictures: Picture[];

    static build(data: any): Item {

        const {
            id,
            name,
            number,
            matter,
            comment,
            statu,
            pictures = [],
        } = data;

        const i = new Item;
        i.id = id;
        i.name = name;
        i.number = number;
        i.comment = comment;
        i.matter = matter;
        i.statu = statu;
        i.pictures = pictures.map(picture => Picture.build(picture));

        return i;
    }

}