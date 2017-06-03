import { User } from './user';
import { Signature } from './signature';
import { Lot } from './lot';
import { Building } from './building';

export class Form {

    public reference_number: number;
    public id: number;
    public date: string;
    public gender: string;
    public users: User[];
    public building: Building;
    public signatures: Signature[];
    public floor: string;
    public flat_number: string;
    public lots: Lot[];
    public json: any;

    static build(data: any): Form {

        const {
            general: {
                reference_number,
            date,
            gender,
            },
            users = [],
            building,
            id,
            floor,
            flat_number,
            signatures = [],
            lots = [],
        } = data;

        const f = new Form;
        f.json = data;
        f.id = id;
        f.building = Building.build(building);
        f.reference_number = reference_number;
        f.date = date;
        f.gender = gender;
        f.floor = floor;
        f.flat_number = flat_number;
        f.users = users.map(user => User.build(user));
        f.signatures = signatures.map(mark => Signature.build(mark));
        f.lots = lots.map(lot => Lot.build(lot))
        return f;
    }
}