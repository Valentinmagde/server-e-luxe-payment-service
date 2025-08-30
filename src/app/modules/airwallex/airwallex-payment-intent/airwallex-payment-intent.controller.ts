import { Request, Response } from "express";
import i18n from "../../../../core/i18n";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import validator from "../../../utils/validator.util";
import { Errors } from "validatorjs";
import { checkObjectId } from "../../../utils/helpers.util";
import airwallexPaymentIntentService from "./airwallex-payment-intent.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-28
 *
 * Class AirwallexPaymentIntentController
 */
class AirwallexPaymentIntentController {
  /**
   * Get airwallex payment intent details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentIntentById(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexPaymentIntentId = req.params.airwallexPaymentIntentId;

    if (checkObjectId(airwallexPaymentIntentId)) {
      airwallexPaymentIntentService
        .getAirwallexPaymentIntentById(airwallexPaymentIntentId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentIntent.stripePaymentIntentNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("stripePaymentIntent.invalidStripePaymentIntentId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get airwallex payment intents by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentIntentsByCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexCustomerId = req.params.airwallexCustomerId;
    if (checkObjectId(airwallexCustomerId)) {
      airwallexPaymentIntentService
        .getAirwallexPaymentIntentsByCustomer(airwallexCustomerId)
        .then((result) => {
          if(result === null || result === undefined){
            const response = {
              status: statusCode.httpBadRequest,
              errNo: errorNumbers.ivalidResource,
              errMsg: i18n.__("stripePaymentIntent.stripeCustomerNotFound"),
            };

            return customResponse.error(response, res);
          }
          else{
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("stripePaymentIntent.invalidCustomerId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all airwallex payment intents handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentIntents(
    req: Request,
    res: Response
  ): Promise<void> {
    airwallexPaymentIntentService
      .getAirwallexPaymentIntents()
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

  /**
   * Add new airwallex payment intent handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      merchant_order_id: "required",
      request_id: "required",
      descriptor: "required",
      return_url: "required",
      amount: "required",
      currency: "required",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            airwallexPaymentIntentService
              .store(req.body)
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
        }
      )
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
   * Confirm airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async confirmAirwallexPaymentIntent(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexPaymentIntentId = req.params.airwallexPaymentIntentId;

    if (checkObjectId(airwallexPaymentIntentId)) {
      airwallexPaymentIntentService
        .confirmAirwallexPaymentIntent(
          airwallexPaymentIntentId,
          req.body
          )
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentIntent.stripePaymentIntentNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
        const response = {
          status: statusCode.httpBadRequest,
          errNo: errorNumbers.ivalidResource,
          errMsg: i18n.__(
            "stripePaymentIntent.invalidStripePaymentIntentId"
          ),
        };

        return customResponse.error(response, res);
    }
  }

  /**
   * Capture a airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async captureAirwallexPaymentIntent(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexPaymentIntentId = req.params.airwallexPaymentIntentId;

    if (checkObjectId(airwallexPaymentIntentId)) {
      airwallexPaymentIntentService
        .captureAirwallexPaymentIntent(airwallexPaymentIntentId, req.body)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentIntent.stripePaymentIntentNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__(
          "stripePaymentIntent.invalidStripePaymentIntentId"
        ),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Cancel a airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-28
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async cancelAirwallexPaymentIntent(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexPaymentIntentId = req.params.airwallexPaymentIntentId;

    if (checkObjectId(airwallexPaymentIntentId)) {
      airwallexPaymentIntentService
        .cancelAirwallexPaymentIntent(airwallexPaymentIntentId, req.body)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentIntent.stripePaymentIntentNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__(
          "stripePaymentIntent.invalidStripePaymentIntentId"
        ),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Update a airwallex payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async update(req: Request, res: Response): Promise<void> {
    const airwallexPaymentIntentId = req.params.airwallexPaymentIntentId;

    // check if role id is valid
    if (checkObjectId(airwallexPaymentIntentId)) {
      airwallexPaymentIntentService
        .update(airwallexPaymentIntentId, req.body)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentIntent.stripePaymentIntentNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__(
          "stripePaymentIntent.invalidStripePaymentIntentId"
        ),
      };

      return customResponse.error(response, res);
    }
  }
}

const airwallexPaymentIntentController = new AirwallexPaymentIntentController();
export default airwallexPaymentIntentController;
