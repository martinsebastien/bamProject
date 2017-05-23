export class Address {

    public line: string;
    public street: string;
    public number: string;
    public npa: number;
    public city: string;
    public province: string;
    public country: string;

    static build(data: any): Address {

        const {
            line,
            street,
            number,
            npa,
            city,
            province,
            country,
        } = data;

        const a = new Address;
        a.line = line;
        a.street = street;
        a.number = number;
        a.npa = npa;
        a.city = city;
        a.province = province;
        a.country = country;
        return a;
    }
}