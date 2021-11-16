export class MedicineBase {
    id!: number;
    name!: string;
    address!: string;
}

export class Medicine extends MedicineBase {
    price!: number;
    quantity!: number;
}
