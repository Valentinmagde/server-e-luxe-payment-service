import { Request, Response } from "express";
import i18n from "../../../../core/i18n";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import validator from "../../../utils/validator.util";
import { Errors } from "validatorjs";
import airwallexPaymentMethodService from "./airwallex-payment-method.service";
import { checkObjectId } from "../../../utils/helpers.util";
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-09-29
 *
 * Class AirwallexPaymentMethodController
 */
class AirwallexPaymentMethodController {
  /**
   * Get airwallex payment method details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentMethodById(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexPaymentMethodId = req.params.airwallexPaymentMethodId;
    if (checkObjectId(airwallexPaymentMethodId)) {
      airwallexPaymentMethodService
        .getAirwallexPaymentMethodById(airwallexPaymentMethodId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "airwallexPaymentMethod.airwallexPaymentMethodNotFound"
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
          "airwallexPaymentMethod.invalidAirwallexPaymentMethodId"
        ),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get airwallex payment methods by customer handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentMethodsByCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    const airwallexCustomerId = req.params.airwallexCustomerId;
    if (checkObjectId(airwallexCustomerId)) {
      airwallexPaymentMethodService
        .getAirwallexPaymentMethodsByCustomer(airwallexCustomerId)
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
        errMsg: i18n.__("airwallexPaymentMethod.invalidCustomerId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all airwallex payment methods handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getAirwallexPaymentMethods(
    req: Request,
    res: Response
  ): Promise<void> {
    airwallexPaymentMethodService
      .getAirwallexPaymentMethods()
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
   * Add new airwallex payment method handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-09-29
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    console.log(req.body);

    const validationRule = {
      type: "required|string",
      // card: {
      //   number: "required",
      //   exp_month: "required",
      //   exp_year: "required",
      //   cvc: "required",
      // },
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
            airwallexPaymentMethodService
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
   * Detach a airwallex payment method a from customer
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async disable(req: Request, res: Response): Promise<void> {
    const airwallexPaymentMethodId = req.params.airwallexPaymentMethodId;

    if (checkObjectId(airwallexPaymentMethodId)) {
      airwallexPaymentMethodService
        .disable(airwallexPaymentMethodId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "airwallexPaymentMethod.airwallexPaymentMethodNotFound"
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
          "airwallexPaymentMethod.invalidAirwallexPaymentMethodId"
        ),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Update a airwallex payment method
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
    const airwallexPaymentMethodId = req.params.airwallexPaymentMethodId;

    // check if role id is valid
    if (checkObjectId(airwallexPaymentMethodId)) {
      airwallexPaymentMethodService
        .update(airwallexPaymentMethodId, req.body)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__(
                "airwallexPaymentMethod.airwallexPaymentMethodNotFound"
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
          "airwallexPaymentMethod.invalidAirwallexPaymentMethodId"
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

const airwallexPaymentMethodController = new AirwallexPaymentMethodController();
export default airwallexPaymentMethodController;
