import { campayCollect, campayGetTransaction } from "../../../../core/campay";
import CampayPaymentIntent from "./campay-payment-intent.model";

class CampayPaymentIntentService {
  public collect(data: {
    amount: string;
    currency: string;
    from: string;
    description?: string;
    external_reference: string;
  }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await campayCollect({
            amount: data.amount,
            currency: data.currency,
            from: data.from,
            description: data.description || "Purchase at E.LUXE",
            external_reference: data.external_reference,
          });

          const record = await CampayPaymentIntent.create({
            reference: result.reference,
            external_reference: data.external_reference,
            status: "PENDING",
            amount: data.amount,
            currency: data.currency,
            from: data.from,
            description: data.description,
            ussd_code: result.ussd_code,
            operator: result.operator,
          });

          resolve(record);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  public getTransaction(reference: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await campayGetTransaction(reference);

          const record = await CampayPaymentIntent.findOneAndUpdate(
            { reference },
            {
              status: result.status,
              operator: result.operator,
              operator_reference: result.operator_reference,
            },
            { new: true }
          );

          resolve(record || result);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const campayPaymentIntentService = new CampayPaymentIntentService();
export default campayPaymentIntentService;
