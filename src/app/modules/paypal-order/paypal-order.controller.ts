import { Request, Response } from "express";
import customResponse from "../../utils/custom-response.util";
import statusCode from "../../utils/status-code.util";
import errorNumbers from "../../utils/error-numbers.util";
import paypalOrderService from "./paypal-order.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-01-03
 *
 * Class PaypalOrderController
 */
class PaypalOrderController {
  /**
   * Create an order to start the transaction.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async createOrder(req: Request, res: Response): Promise<void> {
    paypalOrderService
      .createOrder(req.body)
      .then((result) => {
        const response = {
          status: statusCode.httpCreated,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Capture payment for the created order to complete the transaction.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async captureOrder(req: Request, res: Response): Promise<void> {
    const paypalOrderId = req.params.paypalOrderId;

    paypalOrderService
      .captureOrder(paypalOrderId)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }
}

const paypalOrderController = new PaypalOrderController();
export default paypalOrderController;
