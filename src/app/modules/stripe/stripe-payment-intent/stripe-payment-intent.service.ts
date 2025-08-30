import StripePaymentIntent from "./stripe-payment-intent.model";
import { stripe } from "../../../../core/stripe";
import StripeCustomer from "../stripe-customer/stripe-customer.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-03
 *
 * Class StripePaymentIntentService
 */
class StripePaymentIntentService {
  /**
   * Get stripe payment intent details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {string} stripePaymentIntentId the stripe payment intent id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentIntentById(
    stripePaymentIntentId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentIntent = await StripePaymentIntent.findById(
            stripePaymentIntentId
          );

          resolve(stripePaymentIntent);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get stripe payment intents by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {string} stripeCustomerId the stripe customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentIntentsByCustomer(
    stripeCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomer = await StripeCustomer.findById(
            stripeCustomerId
          );

          if(stripeCustomer){
            const stripePaymentIntents = await StripePaymentIntent.find({
              customer: stripeCustomer.id,
            });

            resolve(stripePaymentIntents);
          }else{
            resolve(stripeCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all stripe payment intents
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentIntents(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentIntents = await StripePaymentIntent.find();

          resolve(stripePaymentIntents);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new stripe payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {any} data the stripe payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await stripe.paymentIntents
            .create(data)
            .then(async (res) => {
              const createdPaymentIntent = new StripePaymentIntent(res);

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
   * Confirm stripe payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {string} stripePaymentIntentId the stripe payment intent id
   * @param {any} data the stripe payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
   public confirmStripePaymentIntent(
    stripePaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentIntent: any = await StripePaymentIntent.findById(
            stripePaymentIntentId
          );

          if (stripePaymentIntent) {
              await stripe.paymentIntents
              .confirm(
                stripePaymentIntent.id,
                data
              )
              .then(res => {
                (async () => {
                  await StripePaymentIntent.updateOne(
                    { _id: stripePaymentIntentId },
                    { $set: res }
                  )
                  .then(() => {
                    resolve(res);
                  })
                  .catch(err => {
                    reject(err)
                  });
                })();
              })
              .catch(err => {
                reject(err)
              });
          } else {
            resolve(stripePaymentIntent);
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
   * @since 2023-09-03
   *
   * @param {string} stripePaymentIntentId the stripe payment intent id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public cancelStripePaymentIntent(
    stripePaymentIntentId: string
  ): Promise<unknown>{
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentIntent: any = await StripePaymentIntent.findById(
            stripePaymentIntentId
          );

          if (stripePaymentIntent) {
            await stripe.paymentIntents
            .cancel(
              stripePaymentIntent.id
            )
            .then(res => {
              (async () => {
                await StripePaymentIntent.updateOne(
                  { _id: stripePaymentIntentId },
                  { $set: res }
                )
                .then(() => {
                  resolve(res);
                })
                .catch(err => {
                  reject(err)
                });
              })();
            })
            .catch(err => {
              reject(err)
            });
          } else {
            resolve(stripePaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a stripe payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {string} stripePaymentIntentId the stripe payment intent id
   * @param {any} data the stripe payment intent data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    stripePaymentIntentId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentIntent = await StripePaymentIntent.findById(
            stripePaymentIntentId
          );

          if (stripePaymentIntent) {
            await stripe.paymentIntents
              .update(stripePaymentIntent.id, data)
              .then((res) => {
                (async () => {
                  await StripePaymentIntent.updateOne(
                    { _id: stripePaymentIntentId },
                    { $set: res }
                  )
                  .then(() => {
                    resolve(res);
                  })
                  .catch(err => {
                    reject(err);
                  });
                })();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(stripePaymentIntent);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const stripePaymentIntentService = new StripePaymentIntentService();
export default stripePaymentIntentService;