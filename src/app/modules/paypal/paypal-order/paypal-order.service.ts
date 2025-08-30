import { OrdersController } from "@paypal/paypal-server-sdk";
import { client } from "../../../../core/paypal";
import PaypalOrder from "./paypal-order.model";
import { parseBody } from "../../../utils/helpers.util";

const ordersController = new OrdersController(client);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-01-03
 *
 * Class PaypalOrderService
 */
class PaypalOrderService {
  /**
   * Create an order to start the transaction.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   *
   * @param {any} data - The order data.
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public createOrder(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const collect = {
            body: data,
            prefer: "return=minimal",
          };

          const { body, ...httpResponse } = await ordersController.ordersCreate(
            collect
          );

          const bodyParsed = await parseBody(body);

          const paypalOrder = await PaypalOrder.create(bodyParsed);

          resolve(paypalOrder);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Capture payment for the created order to complete the transaction.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   *
   * @param {string} orderID - The paypal order ID.
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async captureOrder(orderID: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const data = {
            id: orderID,
            prefer: "return=minimal",
          };

          const { body, ...httpResponse } =
            await ordersController.ordersCapture(data);

          const paypalOrder = await PaypalOrder.findOne({
            id: data.id,
          });

          const bodyParsed = await parseBody(body);

          if (paypalOrder) {
            const bodyParsed = await parseBody(body);
            Object.assign(paypalOrder, bodyParsed);
            await paypalOrder.save();

            resolve(paypalOrder);
          } else {
            reject(bodyParsed);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const paypalOrderService = new PaypalOrderService();
export default paypalOrderService;
