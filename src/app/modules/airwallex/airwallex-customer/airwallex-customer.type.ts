export default interface AirwallexCustomerType {
    _id: string;
    id: string;
    request_id: string;
    status: string;
    message: string;
    merchant_customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    client_secret: string;
    user: string;
    created_at: Date;
    updated_at: Date;
}
