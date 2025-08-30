export default interface AirwallexPaymentIntentType {
    _id: string;
    id: string;
    request_id: string;
    amount: number;
    amount_capturable: number;
    amount_details: AmountDetails;
    amount_received: number;
    application: string;
    application_fee_amount: string;
    automatic_payment_methods: AutomaticPaymentMethods;
    canceled_at: number;
    cancellation_reason: string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: string;
    description: string;
    invoice: string;
    last_payment_error: string;
    latest_charge: string;
    livemode: boolean
    metadata: Metadata;
    next_action: string;
    on_behalf_of: string;
    payment_method: string;
    payment_method_options: PaymentMethodOptions;
    payment_method_types: Array<string>;
    processing: string;
    receipt_email: string;
    review: string;
    setup_future_usage: string;
    shipping: string;
    statement_descriptor: string;
    statement_descriptor_suffix: string;
    status: string;
    transfer_data: string;
    transfer_group: string;
    created_at: Date;
    updated_at: Date;
}

interface Metadata {
    order_id: string;
}

interface AmountDetails {
    tip: object;
}

interface AutomaticPaymentMethods {
    enabled: boolean;
}

interface PaymentMethodOptions {
    card: Card
}

interface Card {
    installments: string;
    mandate_options: string;
    network: string;
    request_three_d_secure: string;
}
