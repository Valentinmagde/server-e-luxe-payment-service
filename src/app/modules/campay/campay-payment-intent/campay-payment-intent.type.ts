export default interface CampayPaymentIntentType {
  _id: string;
  reference: string;
  external_reference: string;
  status: "PENDING" | "SUCCESSFUL" | "FAILED";
  amount: string;
  currency: string;
  from: string;
  description?: string;
  operator?: string;
  operator_reference?: string;
  ussd_code?: string;
  created_at: Date;
  updated_at: Date;
}
