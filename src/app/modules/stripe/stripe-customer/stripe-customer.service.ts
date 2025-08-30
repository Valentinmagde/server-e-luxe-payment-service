import StripeCustomer from "./stripe-customer.model";
import { stripe } from "../../../../core/stripe";
import { _omit } from "../../../utils/helpers.util";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-29
 *
 * Class StripeCustomerService
 */
class StripeCustomerService {
  /**
   * Get stripe customer details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-25
   *
   * @param {string} stripeCustomerId the stripe customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripeCustomerById(stripeCustomerId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomer = await StripeCustomer.findById(
            stripeCustomerId
          );

          resolve(stripeCustomer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get stripe customer by user handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {string} userId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripeCustomersByUser(userId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomers = await StripeCustomer.find({ user: userId });

          resolve(stripeCustomers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all stripe customers
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getStripeCustomers(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomers = await StripeCustomer.find();

          resolve(stripeCustomers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new stripe customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await stripe.customers
            .create(_omit(data, ["user"]))
            .then(async (res) => {
              const createdCustomer = new StripeCustomer({
                ...res,
                user: data.user,
              });

              await createdCustomer.save();

              resolve(createdCustomer);
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
   * Update a stripe customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {string} stripeCustomerId the stripe customer id
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(stripeCustomerId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomer = await StripeCustomer.findById(
            stripeCustomerId
          );

          if (stripeCustomer) {
            stripeCustomer.user = data.user || stripeCustomer.user;

            await stripe.customers
              .update(stripeCustomer.id, _omit(data, ["user"]))
              .then((res) => {
                const updateObject: any = {
                  ...stripeCustomer.toObject(),
                  ...res,
                };

                (async () => {
                  await StripeCustomer.updateOne(
                    { _id: stripeCustomerId },
                    { $set: updateObject }
                  )
                    .then(() => {
                      resolve(updateObject);
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
            resolve(stripeCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a stripe customer by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-30
   *
   * @param {string} stripeCustomerId the stripe customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(stripeCustomerId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const stripeCustomer = await StripeCustomer.findById(
            stripeCustomerId
          );

          if (stripeCustomer) {
            await stripe.customers
              .del(stripeCustomer.id)
              .then(() => {
                (async () => {
                  const deletedStripeCustomer =
                    await StripeCustomer.deleteOne();

                  resolve(deletedStripeCustomer);
                })();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(stripeCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const stripeCustomerService = new StripeCustomerService();
export default stripeCustomerService;
