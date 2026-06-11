import { Request, Response } from "express";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import campayPaymentIntentService from "./campay-payment-intent.service";

class CampayPaymentIntentController {
  public async collect(req: Request, res: Response): Promise<void> {
    campayPaymentIntentService
      .collect(req.body)
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

  public async getTransaction(req: Request, res: Response): Promise<void> {
    const { reference } = req.params;

    campayPaymentIntentService
      .getTransaction(reference)
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

const campayPaymentIntentController = new CampayPaymentIntentController();
export default campayPaymentIntentController;
