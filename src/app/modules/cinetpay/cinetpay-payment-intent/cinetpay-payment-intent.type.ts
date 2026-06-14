export default interface CinetpayPaymentIntentType {
  _id: string;
  transaction_id: string;
  payment_token: string;
  payment_url: string;
  status: "PENDING" | "ACCEPTED" | "REFUSED" | "CANCELLED";
  amount: number;
  currency: string;
  description?: string;
  customer_email: string;
  created_at: Date;
  updated_at: Date;
}
