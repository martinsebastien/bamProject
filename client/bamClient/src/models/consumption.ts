export class Consumption {

    public name: string;
    public id: number;
    public metric: string;
    public number: number;
    public value: number;
    public json: any;

    static build(data: any): Consumption {

        const {
            name,
            id,
            metric,
            number,
            value,
        } = data;

        const c = new Consumption;
        c.name = name;
        c.id = id;
        c.metric = metric;
        c.number = number;
        c.value = value;
        c.json = data;
        return c;
    }
}