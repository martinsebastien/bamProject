export class Signature {

    public image: number;
    public user_id: number;
    public date: string;
    public json: any;

    static build(data: any): Signature {

        const {
            image,
            user_id,
            date,
        } = data;

        const s = new Signature;
        s.json = data;
        s.image = image;
        s.user_id = user_id;
        s.date = date;
        return s;
    }
}