import dotenv from "dotenv";
import { Client, Environment, LogLevel } from "@paypal/paypal-server-sdk";

dotenv.config();

const { NODE_ENV, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

export const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID || "",
    oAuthClientSecret: PAYPAL_CLIENT_SECRET || "",
  },
  timeout: 0,
  environment: NODE_ENV === "production" ? Environment.Production :Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});
