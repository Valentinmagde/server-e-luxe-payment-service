import { Request, Response } from "express";
import i18n from "../../../../core/i18n";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import validator from "../../../utils/validator.util";
import { Errors } from "validatorjs";
import stripePaymentIntentService from "./stripe-payment-intent.service";
import { checkObjectId } from "../../../utils/helpers.util";
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-03
 *
 * Class StripePaymentIntentController
 */
class StripePaymentIntentController {
  /**
   * Get stripe payment intent details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentIntentById(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripePaymentIntentId = req.params.stripePaymentIntentId;

    if (checkObjectId(stripePaymentIntentId)) {
      stripePaymentIntentService
        .getStripePaymentIntentById(stripePaymentIntentId)
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
   * Get stripe payment intents by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentIntentsByCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripeCustomerId = req.params.stripeCustomerId;
    if (checkObjectId(stripeCustomerId)) {
      stripePaymentIntentService
        .getStripePaymentIntentsByCustomer(stripeCustomerId)
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
   * Get all stripe payment intents handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentIntents(
    req: Request,
    res: Response
  ): Promise<void> {
    stripePaymentIntentService
      .getStripePaymentIntents()
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
   * Add new stripe payment intent handler
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
      amount: "required",
      currency: "required"
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
            stripePaymentIntentService
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
   * Confirm stripe payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async confirmStripePaymentIntent(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripePaymentIntentId = req.params.stripePaymentIntentId;

    if (checkObjectId(stripePaymentIntentId)) {
      stripePaymentIntentService
        .confirmStripePaymentIntent(
          stripePaymentIntentId,
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
   * Cancel a stripe payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async cancelStripePaymentIntent(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripePaymentIntentId = req.params.stripePaymentIntentId;

    if (checkObjectId(stripePaymentIntentId)) {
      stripePaymentIntentService
        .cancelStripePaymentIntent(stripePaymentIntentId)
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
   * Update a stripe payment intent
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
    const stripePaymentIntentId = req.params.stripePaymentIntentId;

    // check if role id is valid
    if (checkObjectId(stripePaymentIntentId)) {
      stripePaymentIntentService
        .update(stripePaymentIntentId, req.body)
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

const stripePaymentIntentController = new StripePaymentIntentController();
export default stripePaymentIntentController;
