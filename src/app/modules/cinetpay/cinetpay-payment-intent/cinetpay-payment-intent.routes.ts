import express, { Router } from "express";
import routesGrouping from "../../../utils/routes-grouping.util";
import cinetpayPaymentIntentController from "./cinetpay-payment-intent.controller";

class CinetpayPaymentIntentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  public cinetpayPaymentIntentRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/cinetpayPaymentIntents",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/cinetpayPaymentIntents:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - CinetPay Payment Intents
             *     operationId: createCinetpayPaymentIntent
             *     summary: Create a CinetPay payment intent and return a payment token.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             required:
             *               - amount
             *               - currency
             *               - customer_name
             *               - customer_surname
             *               - customer_email
             *               - customer_phone_number
             *               - customer_address
             *               - customer_city
             *               - customer_country
             *               - customer_state
             *               - customer_zip_code
             *             properties:
             *               amount:
             *                 type: number
             *                 example: 5000
             *               currency:
             *                 type: string
             *                 example: XAF
             *               description:
             *                 type: string
             *               customer_name:
             *                 type: string
             *               customer_surname:
             *                 type: string
             *               customer_email:
             *                 type: string
             *               customer_phone_number:
             *                 type: string
             *               customer_address:
             *                 type: string
             *               customer_city:
             *                 type: string
             *               customer_country:
             *                 type: string
             *               customer_state:
             *                 type: string
             *               customer_zip_code:
             *                 type: string
             *     responses:
             *       201:
             *         description: Payment intent created — contains payment_token and payment_url.
             *       500:
             *         description: Internal Server Error.
             */
            router.post("/", cinetpayPaymentIntentController.create);
          })
        );
      })
    );
  }
}

const cinetpayPaymentIntentRoutes = new CinetpayPaymentIntentRoutes();
export default cinetpayPaymentIntentRoutes;
