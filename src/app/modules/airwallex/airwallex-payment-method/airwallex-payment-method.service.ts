import AirwallexPaymentMethod from "./airwallex-payment-method.model";
import airwallex from "../../../../core/airwallex";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * Class AirwallexPaymentMethodService
 */
class AirwallexPaymentMethodService {
  /**
   * Get airwallex payment method details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} airwallexPaymentMethodId the airwallex payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentMethodById(
    airwallexPaymentMethodId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomer = await AirwallexPaymentMethod.findById(
            airwallexPaymentMethodId
          );

          resolve(airwallexCustomer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get airwallex payment methods by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {string} airwallexCustomerId the airwallex customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentMethodsByCustomer(
    airwallexCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentMethods = await AirwallexPaymentMethod.find({
            airwallex_customer: airwallexCustomerId,
          });

          resolve(airwallexPaymentMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all airwallex payment methods
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentMethods(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentMethods = await AirwallexPaymentMethod.find();

          resolve(airwallexPaymentMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new airwallex payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-09-29
   *
   * @param {any} data the airwallex payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          console.log(data, "data");
          await airwallex.paymentAcceptance.paymentMethods
            .createPaymentMethod(data)
            .then(async (res) => {
              const createdPaymentMethod = new AirwallexPaymentMethod(res);

              await createdPaymentMethod.save();

              resolve(createdPaymentMethod);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Disable a payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} airwallexPaymentMethodId the airwallex payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public disable(airwallexPaymentMethodId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentMethod: any =
            await AirwallexPaymentMethod.findById(airwallexPaymentMethodId);

          if (airwallexPaymentMethod) {
            await airwallex.paymentAcceptance.paymentMethods
              .disablePaymentMethod(airwallexPaymentMethod.id, {
                request_id: airwallexPaymentMethod.request_id,
              })
              .then((res) => {
                (async () => {
                  await AirwallexPaymentMethod.updateOne(
                    { _id: airwallexPaymentMethodId },
                    { $set: res }
                  )
                    .then(() => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(airwallexPaymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a airwallex payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} airwallexPaymentMethodId the airwallex payment method id
   * @param {any} data the airwallex payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    airwallexPaymentMethodId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentMethod = await AirwallexPaymentMethod.findById(
            airwallexPaymentMethodId
          );

          if (airwallexPaymentMethod) {
            await airwallex.paymentAcceptance.paymentMethods
              .updatePaymentMethod(airwallexPaymentMethod.id, data)
              .then((res) => {
                (async () => {
                  await AirwallexPaymentMethod.updateOne(
                    { _id: airwallexPaymentMethodId },
                    { $set: res }
                  )
                    .then(() => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(airwallexPaymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const airwallexPaymentMethodService = new AirwallexPaymentMethodService();
export default airwallexPaymentMethodService;
