import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, CINETPAY_API_KEY, CINETPAY_SITE_ID, CINETPAY_NOTIFY_URL } = process.env;

export const CINETPAY_BASE_URL = "https://api-checkout.cinetpay.com/v2";

export interface CinetPayInitResponse {
  payment_token: string;
  payment_url: string;
}

export async function cinetpayInitPayment(payload: {
  transaction_id: string;
  amount: number;
  currency: string;
  description: string;
  notify_url?: string;
  return_url?: string;
  customer_name: string;
  customer_surname: string;
  customer_email: string;
  customer_phone_number: string;
  customer_address: string;
  customer_city: string;
  customer_country: string;
  customer_state: string;
  customer_zip_code: string;
}): Promise<CinetPayInitResponse> {
  const requestBody = {
    apikey: CINETPAY_API_KEY || "",
    site_id: Number(CINETPAY_SITE_ID),
    transaction_id: payload.transaction_id,
    amount: Math.round(payload.amount),
    currency: payload.currency,
    description: payload.description,
    notify_url: payload.notify_url || CINETPAY_NOTIFY_URL || "",
    return_url: payload.return_url || process.env.WEB_CLIENT_URL || "http://localhost:7001",
    channels: "ALL",
    customer_name: payload.customer_name,
    customer_surname: payload.customer_surname,
    customer_email: payload.customer_email,
    customer_phone_number: payload.customer_phone_number,
    customer_address: payload.customer_address,
    customer_city: payload.customer_city,
    customer_country: payload.customer_country,
    customer_state: payload.customer_state,
    customer_zip_code: payload.customer_zip_code,
  };
  console.log("[CinetPay] Request body:", JSON.stringify(requestBody, null, 2));

  const res = await fetch(`${CINETPAY_BASE_URL}/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: CINETPAY_API_KEY || "",
      site_id: Number(CINETPAY_SITE_ID),
      transaction_id: payload.transaction_id,
      amount: Math.round(payload.amount),
      currency: payload.currency,
      description: payload.description,
      notify_url: payload.notify_url || CINETPAY_NOTIFY_URL || "",
      return_url: payload.return_url || process.env.WEB_CLIENT_URL || "http://localhost:7001",
      channels: "ALL",
      customer_name: payload.customer_name,
      customer_surname: payload.customer_surname,
      customer_email: payload.customer_email,
      customer_phone_number: payload.customer_phone_number,
      customer_address: payload.customer_address,
      customer_city: payload.customer_city,
      customer_country: payload.customer_country,
      customer_state: payload.customer_state,
      customer_zip_code: payload.customer_zip_code,
    }),
  });

  const data = (await res.json()) as {
    code: string;
    message: string;
    data?: CinetPayInitResponse;
  };
  console.log("[CinetPay] Response:", JSON.stringify(data, null, 2));

  if (!res.ok || data.code !== "201") {
    throw new Error(`CinetPay init failed: ${data.message}`);
  }

  return data.data!;
}
