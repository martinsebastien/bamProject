export class User {

    public lastname: String;
    public firstname: String;
    public email: String;
    public private_phone: String;
    public public_phone: String;
    public iban: String;
    public reference_number: String;
    public form_id: Number;
    public code_entrance: String;
    public floor: String;
    public flat_number: String;
    public street_number: String;
    public line: String;
    public npa: String;
    public city: String;
    public json: any;

    static build(data: any): User {

        const {
            lastname,
            firstname,
            email,
            private_phone,
            public_phone,
            iban,
            reference_number,
            form_id,
            code_entrance,
            floor,
            flat_number,
            street_number,
            line,
            npa,
            city
        } = data

        const u = new User;
        u.json = data;
        u.lastname = lastname;
        u.firstname = firstname;
        u.email = email;
        u.private_phone = private_phone;
        u.public_phone = public_phone;
        u.iban = iban;
        u.reference_number = reference_number;
        u.form_id = form_id;
        u.code_entrance = code_entrance;
        u. floor = floor;
        u.flat_number = flat_number;
        u.street_number = street_number;
        u. line = line;
        u.npa = npa;
        u.city = city;
        return u;
    }
}