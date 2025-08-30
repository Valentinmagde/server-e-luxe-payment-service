import { Airwallex } from "@airwallex/node-sdk";
import config from "../config";

const airwallex = new Airwallex({
  clientId: config.airwallexClientId,
  apiKey: config.airwallexApiKey,
  env: config.env === "production" ? "prod" : "demo",
});
export default airwallex;
