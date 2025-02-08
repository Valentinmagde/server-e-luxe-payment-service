import StripePaymentMethod from "./stripe-payment-method.model";
import StripeCustomer from "../stripe-customer/stripe-customer.model";
import { stripe, stripe_pk } from "../../../core/stripe";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * Class StripePaymentMethodService
 */
class StripePaymentMethodService {
  /**
   * Get stripe payment method details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} stripePaymentMethodId the stripe payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentMethodById(
    stripePaymentMethodId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomer = await StripePaymentMethod.findById(
            stripePaymentMethodId
          );

          resolve(stripeCustomer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get stripe payment methods by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {string} stripeCustomerId the stripe customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentMethodsByCustomer(
    stripeCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentMethods = await StripePaymentMethod.find({
            stripe_customer: stripeCustomerId,
          });

          resolve(stripePaymentMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all stripe payment methods
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripePaymentMethods(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentMethods = await StripePaymentMethod.find();

          resolve(stripePaymentMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new stripe payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {any} data the stripe payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await stripe_pk.paymentMethods
            .create(data)
            .then(async (res) => {
              const createdPaymentMethod = new StripePaymentMethod(res);

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
   * Attach stripe payment method to customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} stripePaymentMethodId the stripe payment method id
   * @param {string} stripeCustomerId the stripe customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
   public attach(
    stripePaymentMethodId: string,
    stripeCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentMethod: any = await StripePaymentMethod.findById(
            stripePaymentMethodId
          );

          if (stripePaymentMethod) {
            const stripeCustomer: any = await StripeCustomer.findById(
              stripeCustomerId
            );

            if (stripeCustomer) {
              await stripe.paymentMethods.attach(
                stripePaymentMethod.id,
                {
                  customer: stripeCustomer.id,
                }
              )
              .then(res => {
                (async () => {
                  await StripePaymentMethod.updateOne(
                    { _id: stripePaymentMethodId },
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
            }
            else{
              resolve("STRIPE_CUSTOMER_NOT_FOUND");
            }
          } else {
            resolve("STRIPE_PAYMENT_METHOD_NOT_FOUND");
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Detach a payment method a from customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} stripePaymentMethodId the stripe payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public detach(
    stripePaymentMethodId: string
  ): Promise<unknown>{
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentMethod: any = await StripePaymentMethod.findById(
            stripePaymentMethodId
          );

          if (stripePaymentMethod) {
            await stripe.paymentMethods.detach(
              stripePaymentMethod.id
            )
            .then(res => {
              (async () => {
                await StripePaymentMethod.updateOne(
                  { _id: stripePaymentMethodId },
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
            resolve(stripePaymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a stripe payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {string} stripePaymentMethodId the stripe payment method id
   * @param {any} data the stripe payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    stripePaymentMethodId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripePaymentMethod = await StripePaymentMethod.findById(
            stripePaymentMethodId
          );

          if (stripePaymentMethod) {
            await stripe.paymentMethods
              .update(stripePaymentMethod.id, data)
              .then((res) => {
                (async () => {
                  await StripePaymentMethod.updateOne(
                    { _id: stripePaymentMethodId },
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
            resolve(stripePaymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const stripePaymentMethodService = new StripePaymentMethodService();
export default stripePaymentMethodService;