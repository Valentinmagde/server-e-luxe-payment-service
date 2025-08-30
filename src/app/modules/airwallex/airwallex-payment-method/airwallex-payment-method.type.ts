export default interface AirwallexPaymentMethodType {
    _id: string;
    id: string;
    request_id: string;
    customer_id: string;
    type: string;
    card: object;
    status: string;
    created_at: Date;
    updated_at: Date;
}
