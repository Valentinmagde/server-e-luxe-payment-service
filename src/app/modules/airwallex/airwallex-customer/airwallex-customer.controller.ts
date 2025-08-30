import { Request, Response } from "express";
import i18n from "../../../../core/i18n";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import validator from "../../../utils/validator.util";
import { Errors } from "validatorjs";
import airwallexCustomerService from "./airwallex-customer.service";
import { checkObjectId } from "../../../utils/helpers.util";
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-29
 *
 * Class AirwallexCustomerController
 */
class AirwallexCustomerController {
  /**
   * Get airwallex customer details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexCustomerById(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexCustomerId = req.params.airwallexCustomerId;
    if (checkObjectId(airwallexCustomerId)) {
      airwallexCustomerService
        .getAirwallexCustomerById(airwallexCustomerId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("stripeCustomer.stripeCustomerNotFound"),
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
    else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("stripeCustomer.invalidStripeCustomerId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get airwallex customers by user handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexCustomersByUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const userId = req.params.userId;
    if (checkObjectId(userId)) {
      airwallexCustomerService
        .getAirwallexCustomersByUser(userId)
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
    else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("stripeCustomer.invalidUserId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all airwallex customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexCustomers(req: Request, res: Response): Promise<void> {
    airwallexCustomerService
      .getAirwallexCustomers()
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
   * Add new customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      name: "required|string",
      email: "required|email",
      phone: "required",
      user: "required"
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
            airwallexCustomerService
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
                  status:
                    error?.status || statusCode.httpInternalServerError,
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
   * Update a airwallex customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-30
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async update(req: Request, res: Response): Promise<void> {
    const validationRule = {
      name: "required|string",
      email: "required|email",
      phone: "required",
      user: "required"
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
            const airwallexCustomerId = req.params.airwallexCustomerId;

            // check if role id is valid
            if (checkObjectId(airwallexCustomerId)) {
              airwallexCustomerService
                .update(airwallexCustomerId, req.body)
                .then((result) => {
                  if (result === null || result === undefined) {
                    const response = {
                      status: statusCode.httpNotFound,
                      errNo: errorNumbers.resourceNotFound,
                      errMsg: i18n.__("stripeCustomer.stripeCustomerNotFound"),
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
                    status:
                      error?.status || statusCode.httpInternalServerError,
                    errNo: errorNumbers.genericError,
                    errMsg: error?.message || error,
                  };

                  return customResponse.error(response, res);
                });
            } else {
              const response = {
                status: statusCode.httpBadRequest,
                errNo: errorNumbers.ivalidResource,
                errMsg: i18n.__("stripeCustomer.invalidStripeCustomerId"),
              };

              return customResponse.error(response, res);
            }
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
   * Delete a airwallex customer by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-30
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async delete(req: Request, res: Response): Promise<void> {
    const airwallexCustomerId = req.params.airwallexCustomerId;

    if (checkObjectId(airwallexCustomerId)) {
      airwallexCustomerService
        .delete(airwallexCustomerId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("stripeCustomer.stripeCustomerNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpNoContent,
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
        errMsg: i18n.__("stripeCustomer.invalidStripeCustomerId"),
      };

      return customResponse.error(response, res);
    }
  }
}

const airwallexCustomerController = new AirwallexCustomerController();
export default airwallexCustomerController;
