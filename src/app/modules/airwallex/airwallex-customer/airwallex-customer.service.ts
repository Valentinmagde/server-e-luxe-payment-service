import AirwallexCustomer from "./airwallex-customer.model";
import { _omit } from "../../../utils/helpers.util";
import airwallex from "../../../../core/airwallex";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-29
 *
 * Class AirwallexCustomerService
 */
class AirwallexCustomerService {
  /**
   * Get airwallex customer details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-25
   *
   * @param {string} airwallexCustomerId the airwallex customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexCustomerById(
    airwallexCustomerId: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomer = await AirwallexCustomer.findById(
            airwallexCustomerId
          );

          resolve(airwallexCustomer);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get airwallex customer by user handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {string} userId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexCustomersByUser(userId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomers = await AirwallexCustomer.find({
            user: userId,
          });

          resolve(airwallexCustomers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all airwallex customers
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAirwallexCustomers(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomers = await AirwallexCustomer.find();

          resolve(airwallexCustomers);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new airwallex customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await airwallex.paymentAcceptance.customers
            .createCustomer(_omit(data, ["user"]) as any)
            .then(async (res) => {
              const createdCustomer = new AirwallexCustomer({
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
   * Update a airwallex customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {string} airwallexCustomerId the airwallex customer id
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    airwallexCustomerId: string,
    data: any
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomer = await AirwallexCustomer.findById(
            airwallexCustomerId
          );

          if (airwallexCustomer) {
            airwallexCustomer.user = data.user || airwallexCustomer.user;

            await airwallex.paymentAcceptance.customers
              .updateCustomer(
                airwallexCustomer.id,
                _omit(data, ["user"]) as any
              )
              .then((res) => {
                const updateObject: any = {
                  ...airwallexCustomer.toObject(),
                  ...res,
                };

                (async () => {
                  await AirwallexCustomer.updateOne(
                    { _id: airwallexCustomerId },
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
            resolve(airwallexCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a airwallex customer by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-30
   *
   * @param {string} airwallexCustomerId the airwallex customer id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(airwallexCustomerId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const airwallexCustomer = await AirwallexCustomer.findById(
            airwallexCustomerId
          );

          if (airwallexCustomer) {
            const deletedAirwallexCustomer =
              await AirwallexCustomer.deleteOne();

            resolve(deletedAirwallexCustomer);
          } else {
            resolve(airwallexCustomer);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const airwallexCustomerService = new AirwallexCustomerService();
export default airwallexCustomerService;
