import { User } from './user';
import { Signature } from './signature';
import { Lot } from './lot'

export class Form {

    public reference_number: number;
    public date: string;
    public gender: string;
    public users: User[];
    public signatures: Signature[];
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
            signatures = [],
            lots: flats = [],
        } = data;

        const [tenants = []] = users;
        const [marks = []] = signatures;
        const [lots = []] = flats;

        const f = new Form;
        f.json = data;
        f.date = date;
        f.gender = gender;
        f.users = users.map(user => User.build(user));
        f.signatures = marks.map(mark => Signature.build(mark));
        f.lots = lots.map(lot => Lot.build(lot));
        return f;
    }
}