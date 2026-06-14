import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  CAMPAY_USERNAME,
  CAMPAY_PASSWORD,
} = process.env;

export const CAMPAY_BASE_URL =
  NODE_ENV === "production"
    ? "https://www.campay.net/api"
    : "https://demo.campay.net/api";

export async function getCampayToken(): Promise<string> {
  const res = await fetch(`${CAMPAY_BASE_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: CAMPAY_USERNAME || "",
      password: CAMPAY_PASSWORD || "",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CamPay auth failed: ${text}`);
  }

  const data = await res.json() as { token: string };
  return data.token;
}

export async function campayCollect(payload: {
  amount: string;
  currency: string;
  from: string;
  description: string;
  external_reference: string;
}): Promise<{ reference: string; ussd_code?: string; operator?: string }> {
  const token = await getCampayToken();

  const res = await fetch(`${CAMPAY_BASE_URL}/collect/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CamPay collect failed: ${text}`);
  }

  return res.json() as Promise<{ reference: string; ussd_code?: string; operator?: string }>;
}

export async function campayGetTransaction(reference: string): Promise<{
  reference: string;
  status: "SUCCESSFUL" | "FAILED" | "PENDING";
  amount: string;
  currency: string;
  operator?: string;
  operator_reference?: string;
  code?: string;
}> {
  const token = await getCampayToken();

  const res = await fetch(`${CAMPAY_BASE_URL}/transaction/${reference}/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CamPay transaction check failed: ${text}`);
  }

  return res.json() as Promise<{
    reference: string;
    status: "SUCCESSFUL" | "FAILED" | "PENDING";
    amount: string;
    currency: string;
    operator?: string;
    operator_reference?: string;
    code?: string;
  }>;
}
