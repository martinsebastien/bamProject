import { Address } from './address';

export class Building {

    public name: string;
    public code: string;
    public address: Address;

    static build(data: any): Building {
        
        const {
            name,
            code,
            address,
        } = data;

        const b = new Building;
        b.name = name;
        b.code = code;
        b.address = Address.build(address);
        return b;
    }
}