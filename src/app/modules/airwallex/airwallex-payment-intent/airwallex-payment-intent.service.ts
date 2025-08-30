import airwallex from "../../../../core/airwallex";
import AirwallexCustomer from "../airwallex-customer/airwallex-customer.model";
import AirwallexPaymentIntent from "./airwallex-payment-intent.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-28
 *
 * Class AirwallexPaymentIntentService
 */
class AirwallexPaymentIntentService {
  /**
   * Get airwallex payment intent details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexPaymentIntentId the airwallex payment intent id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentIntentById(
    airwallexPaymentIntentId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntent =
            await airwallex.paymentAcceptance.paymentIntents.retrievePaymentIntent(
              airwallexPaymentIntentId
            );

          resolve(airwallexPaymentIntent);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get airwallex payment intents by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexCustomerId the airwallex customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentIntentsByCustomer(
    airwallexCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomer = await AirwallexCustomer.findById(
            airwallexCustomerId
          );

          if (airwallexCustomer) {
            const airwallexPaymentIntents = await AirwallexPaymentIntent.find({
              customer_id: airwallexCustomer.id,
            });

            resolve(airwallexPaymentIntents);
          } else {
            resolve(airwallexCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all airwallex payment intents
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexPaymentIntents(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntents = await AirwallexPaymentIntent.find();

          resolve(airwallexPaymentIntents);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {any} data the airwallex payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await airwallex.paymentAcceptance.paymentIntents
            .createPaymentIntent(data)
            .then(async (res) => {
              const createdPaymentIntent = new AirwallexPaymentIntent(res);

              await createdPaymentIntent.save();

              resolve(createdPaymentIntent);
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
   * Confirm airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexPaymentIntentId the airwallex payment intent id
   * @param {any} data the airwallex payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public confirmAirwallexPaymentIntent(
    airwallexPaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntent: any =
            await AirwallexPaymentIntent.findOne({
              id: airwallexPaymentIntentId,
            }).exec();

          if (airwallexPaymentIntent) {
            await airwallex.paymentAcceptance.paymentIntents
              .confirmPaymentIntent(airwallexPaymentIntent.id, data)
              .then((res) => {
                (async () => {
                  await AirwallexPaymentIntent.updateOne(
                    { id: airwallexPaymentIntentId },
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
            resolve(airwallexPaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Capture airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexPaymentIntentId the airwallex payment intent id
   * @param {any} data the airwallex payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async captureAirwallexPaymentIntent(
    airwallexPaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntent: any =
            await AirwallexPaymentIntent.findOne({
              id: airwallexPaymentIntentId,
            }).exec();

          if (airwallexPaymentIntent) {
            await airwallex.paymentAcceptance.paymentIntents
              .capturePaymentIntent(airwallexPaymentIntent.id, data)
              .then((res) => {
                (async () => {
                  await AirwallexPaymentIntent.updateOne(
                    { id: airwallexPaymentIntentId },
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
            resolve(airwallexPaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Cancel a payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexPaymentIntentId the airwallex payment intent id
   * @param {any} data the airwallex payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public cancelAirwallexPaymentIntent(
    airwallexPaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntent: any =
            await AirwallexPaymentIntent.findById(airwallexPaymentIntentId);

          if (airwallexPaymentIntent) {
            await airwallex.paymentAcceptance.paymentIntents
              .cancelPaymentIntent(airwallexPaymentIntent.id, {
                cancellation_reason: data?.cancellation_reason || "",
                request_id: airwallexPaymentIntent.request_id,
              })
              .then((res) => {
                (async () => {
                  await AirwallexPaymentIntent.updateOne(
                    { _id: airwallexPaymentIntentId },
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
            resolve(airwallexPaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {string} airwallexPaymentIntentId the airwallex payment intent id
   * @param {any} data the airwallex payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    airwallexPaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexPaymentIntent = await AirwallexPaymentIntent.findById(
            airwallexPaymentIntentId
          );

          if (airwallexPaymentIntent) {
            await airwallex.paymentAcceptance.paymentIntents
              .updatePaymentIntent(airwallexPaymentIntent.id, data)
              .then((res) => {
                (async () => {
                  await AirwallexPaymentIntent.updateOne(
                    { _id: airwallexPaymentIntentId },
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
            resolve(airwallexPaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const airwallexPaymentIntentService = new AirwallexPaymentIntentService();
export default airwallexPaymentIntentService;
