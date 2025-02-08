import { slugify } from "../../utils/helpers.util";
import System from "../system/system.model";
import PaymentMethod from "./payment-method.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class PaymentMethodService
 */
class PaymentMethodService {
  /**
   * Get payment method details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} paymentMethodId the payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getPaymentMethodById(paymentMethodId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod = await PaymentMethod.findById(paymentMethodId);

          resolve(paymentMethod);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get payment method details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} paymentMethodSlug the payment method slug
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getPaymentMethodBySlug(paymentMethodSlug: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod = await PaymentMethod.findOne({slug: paymentMethodSlug});

          resolve(paymentMethod);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get payment methods by system handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-14
   *
   * @param {string} systemId the system id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getPaymentMethodsBySystem(systemId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const system = await System.findById(systemId);

          if (system) {
            const paymentMethods = await PaymentMethod.find({
              systems: systemId,
            }).select("-systems");

            resolve(paymentMethods);
          } else {
            resolve(system);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all payment methods
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getPaymentMethods(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethods = await PaymentMethod.find();

          resolve(paymentMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          data.slug = data.slug || slugify(data.name);
          const paymentMethod = new PaymentMethod(data);

          const createdPaymentMethod = await paymentMethod.save();

          resolve(createdPaymentMethod);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Assign a system to a payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} paymentMethodId the payment method id
   * @param {string} systemId the system id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public assign(paymentMethodId: string, systemId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod: any = await PaymentMethod.findById(
            paymentMethodId
          );

          if (paymentMethod) {
            const system: any = await System.findById(systemId);

            if (system) {
              // Check if the payment method doesn't already have this system
              if (paymentMethod.systems.includes(system._id))
                resolve("ALREADY_ASSIGNED");
              else {
                paymentMethod.systems = [...paymentMethod.systems, system._id];

                await paymentMethod.save();
              }

              resolve(paymentMethod);
            } else {
              resolve("SYSTEM_NOT_FOUND");
            }
          } else {
            resolve("USER_NOT_FOUND");
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Unassign a system from a payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} paymentMethodId the payment method id
   * @param {string} systemId the system id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public unassign(paymentMethodId: string, systemId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod: any = await PaymentMethod.findById(
            paymentMethodId
          );

          if (paymentMethod) {
            const system: any = await System.findById(systemId);

            if (system) {
              // Check if the payment method have this system
              if (!paymentMethod.systems.includes(system._id))
                resolve("NOT_HAVE_THIS_SYSTEM");
              else {
                paymentMethod.systems = paymentMethod.systems.filter(
                  (x: any) => x.toString() != system._id.toString()
                );

                await paymentMethod.save();
              }

              resolve(paymentMethod);
            } else {
              resolve("SYSTEM_NOT_FOUND");
            }
          } else {
            resolve("PAYMENT_METHOD_NOT_FOUND");
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} paymentMethodId the payment method id
   * @param {any} data the payment method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(paymentMethodId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod = await PaymentMethod.findById(paymentMethodId);

          if (paymentMethod) {
            paymentMethod.name = data.name || paymentMethod.name;
            paymentMethod.slug =
              data.slug ||
              paymentMethod.slug ||
              slugify(paymentMethod.name);
            paymentMethod.description =
              data.description || paymentMethod.description;

            const updatedPaymentMethod = await paymentMethod.save();

            resolve(updatedPaymentMethod);
          } else {
            resolve(paymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a payment method by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} paymentMethodId the payment method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(paymentMethodId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const paymentMethod = await PaymentMethod.findById(paymentMethodId);

          if (paymentMethod) {
            const deletedPaymentMethod = await paymentMethod.deleteOne();

            resolve(deletedPaymentMethod);
          } else {
            resolve(paymentMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const paymentMethodService = new PaymentMethodService();
export default paymentMethodService;
