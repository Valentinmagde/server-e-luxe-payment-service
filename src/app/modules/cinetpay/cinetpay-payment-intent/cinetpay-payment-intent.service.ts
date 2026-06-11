import { cinetpayInitPayment } from "../../../../core/cinetpay";
import CinetpayPaymentIntent from "./cinetpay-payment-intent.model";

class CinetpayPaymentIntentService {
  public create(data: {
    amount: number;
    currency: string;
    description?: string;
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
  }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const transaction_id = Math.floor(Math.random() * 100000000).toString();

          const result = await cinetpayInitPayment({
            transaction_id,
            amount: data.amount,
            currency: data.currency,
            description: data.description || "Purchase at E.LUXE",
            notify_url: data.notify_url,
            return_url: data.return_url,
            customer_name: data.customer_name,
            customer_surname: data.customer_surname,
            customer_email: data.customer_email,
            customer_phone_number: data.customer_phone_number,
            customer_address: data.customer_address,
            customer_city: data.customer_city,
            customer_country: data.customer_country,
            customer_state: data.customer_state,
            customer_zip_code: data.customer_zip_code,
          });

          const record = await CinetpayPaymentIntent.create({
            transaction_id,
            payment_token: result.payment_token,
            payment_url: result.payment_url,
            status: "PENDING",
            amount: data.amount,
            currency: data.currency,
            description: data.description,
            customer_email: data.customer_email,
          });

          resolve(record);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const cinetpayPaymentIntentService = new CinetpayPaymentIntentService();
export default cinetpayPaymentIntentService;
