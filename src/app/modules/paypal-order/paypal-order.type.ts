export default interface PaypalOrderType {
    _id: string;
    id: string;
    status: string;
    intent: string;
    payment_source: any;
    create_time: Date;
    payer: any;
    purchase_units: Array<any>;
    links: Array<any>;
    created_at: Date;
    updated_at: Date;
}
