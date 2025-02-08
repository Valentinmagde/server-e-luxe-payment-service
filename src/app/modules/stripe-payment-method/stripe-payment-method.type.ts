export default interface StripePaymentMethodType {
    _id: string;
    id: string;
    object: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer: string;
    livemode: boolean;
    metadata: Metadata;
    type: string;
    created_at: Date;
    updated_at: Date;
}

interface BillingDetails {
    address: Address;
    email: string;
    name: string;
    phone: string;
}

interface Address {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

interface Card {
    brand: string;
    checks: Checks;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string;
    last4: number;
    networks: Networks;
    three_d_secure_usage: threeDSecureUsage;
    wallet: string;
}

interface Checks {
    address_line1_check: string;
    address_postal_code_check: string;
    cvc_check: string;
}

interface Networks {
    available: Array<string>;
    preferred: string;
}

interface threeDSecureUsage {
    supported: boolean;
}

interface Metadata {
    order_id: string;
}