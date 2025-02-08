export default interface StripeCustomerType {
    _id: string;
    id: string;
    object: string;
    address: string;
    balance: number;
    created: number;
    currency: string;
    default_source: string;
    delinquent: boolean;
    description: string;
    discount: string;
    email: string;
    invoice_prefix: string;
    invoice_settings: InvoiceSettings;
    livemode: boolean;
    metadata: Metadata;
    name: string;
    next_invoice_sequence: number;
    phone: string;
    preferred_locales: Array<any>;
    shipping: string;
    tax_exempt: string;
    test_clock: string;
    user: string;
    created_at: Date;
    updated_at: Date;
}

interface InvoiceSettings {
    custom_fields: string;
    default_payment_method: string;
    footer: string;
    rendering_options: string;
}

interface Metadata {
    order_id: string;
}