export class Picture {

    public id: number;
    public image: string;

    static build(data: any): Picture {

        const {
            id,
            image,
        } = data;

        const p = new Picture;
        p.id = id;
        p.image = image;
        return p;
    }
}