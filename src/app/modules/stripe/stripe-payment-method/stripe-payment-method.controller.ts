import { Request, Response } from "express";
import i18n from "../../../../core/i18n";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import validator from "../../../utils/validator.util";
import { Errors } from "validatorjs";
import stripePaymentMethodService from "./stripe-payment-method.service";
import { checkObjectId } from "../../../utils/helpers.util";
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * Class StripePaymentMethodController
 */
class StripePaymentMethodController {
  /**
   * Get stripe payment method details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentMethodById(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripePaymentMethodId = req.params.stripePaymentMethodId;
    if (checkObjectId(stripePaymentMethodId)) {
      stripePaymentMethodService
        .getStripePaymentMethodById(stripePaymentMethodId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentMethod.stripePaymentMethodNotFound"
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
        errMsg: i18n.__("stripePaymentMethod.invalidStripePaymentMethodId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get stripe payment methods by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentMethodsByCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    const stripeCustomerId = req.params.stripeCustomerId;
    if (checkObjectId(stripeCustomerId)) {
      stripePaymentMethodService
        .getStripePaymentMethodsByCustomer(stripeCustomerId)
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
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("stripePaymentMethod.invalidCustomerId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all stripe payment methods handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getStripePaymentMethods(
    req: Request,
    res: Response
  ): Promise<void> {
    stripePaymentMethodService
      .getStripePaymentMethods()
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
   * Add new stripe payment method handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      type: "required|string",
      card: {
        number: "required",
        exp_month: "required",
        exp_year: "required",
        cvc: "required"
      }
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
            stripePaymentMethodService
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
   * Attach stripe payment method to customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async attach(req: Request, res: Response): Promise<void> {
    const stripeCustomerId = req.params.stripeCustomerId;
    const stripePaymentMethodId = req.params.stripePaymentMethodId;

    if (!checkObjectId(stripeCustomerId)) {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__(
          "stripePaymentMethod.invalidStripePaymentMethodId"
        ),
      };

      return customResponse.error(response, res);
    } else {
      stripePaymentMethodService
        .attach(stripePaymentMethodId, stripeCustomerId)
        .then((result) => {
          if (result === "STRIPE_PAYMENT_METHOD_NOT_FOUND") {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentMethod.stripePaymentMethodNotFound"
              ),
            };

            return customResponse.error(response, res);
          } else if (result === "STRIPE_CUSTOMER_NOT_FOUND") {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentMethod.stripeCustomerNotFound"
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
    }
  }

  /**
   * Detach a stripe payment method a from customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async detach(req: Request, res: Response): Promise<void> {
    const stripePaymentMethodId = req.params.stripePaymentMethodId;

    if (checkObjectId(stripePaymentMethodId)) {
      stripePaymentMethodService
        .detach(stripePaymentMethodId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "stripePaymentMethod.stripePaymentMethodNotFound"
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
          "stripePaymentMethod.invalidStripePaymentMethodId"
        ),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Update a stripe payment method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async update(req: Request, res: Response): Promise<void> {
    // const validationRule = {
    //   type: "required|string",
    //   "metadata": "required"
    // };

    // await validator
    //   .validator(
    //     req.body,
    //     validationRule,
    //     {},
    //     (err: Errors, status: boolean) => {
    //       if (!status) {
    //         const response = {
    //           status: statusCode.httpPreconditionFailed,
    //           errNo: errorNumbers.validator,
    //           errMsg: err.errors,
    //         };

    //         return customResponse.error(response, res);
    //       }
    //       else {
            const stripePaymentMethodId = req.params.stripePaymentMethodId;

            // check if role id is valid
            if (checkObjectId(stripePaymentMethodId)) {
              stripePaymentMethodService
                .update(stripePaymentMethodId, req.body)
                .then((result) => {
                  if (result === null || result === undefined) {
                    const response = {
                      status: statusCode.httpNotFound,
                      errNo: errorNumbers.resourceNotFound,
                      errMsg: i18n.__(
                        "stripePaymentMethod.stripePaymentMethodNotFound"
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
                  "stripePaymentMethod.invalidStripePaymentMethodId"
                ),
              };

              return customResponse.error(response, res);
            }
      //     }
      //   }
      // )
      // .catch((error) => {
      //   const response = {
      //     status: error?.status || statusCode.httpInternalServerError,
      //     errNo: errorNumbers.genericError,
      //     errMsg: error?.message || error,
      //   };

      //   return customResponse.error(response, res);
      // });
  }
}

const stripePaymentMethodController = new StripePaymentMethodController();
export default stripePaymentMethodController;
