import { Request, Response } from "express";
import customResponse from "../../../utils/custom-response.util";
import statusCode from "../../../utils/status-code.util";
import errorNumbers from "../../../utils/error-numbers.util";
import cinetpayPaymentIntentService from "./cinetpay-payment-intent.service";

class CinetpayPaymentIntentController {
  public async create(req: Request, res: Response): Promise<void> {
    cinetpayPaymentIntentService
      .create(req.body)
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

const cinetpayPaymentIntentController = new CinetpayPaymentIntentController();
export default cinetpayPaymentIntentController;
