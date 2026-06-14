import express, { Router } from "express";
import routesGrouping from "../../../utils/routes-grouping.util";
import campayPaymentIntentController from "./campay-payment-intent.controller";

class CampayPaymentIntentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  public campayPaymentIntentRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/campayPaymentIntents",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/campayPaymentIntents:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - CamPay Payment Intents
             *     operationId: collectCampay
             *     summary: Initiate a CamPay mobile money collection.
             *     description: Sends a USSD push to the customer's mobile money number.
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
             *             properties:
             *               amount:
             *                 type: string
             *                 example: "5000"
             *               currency:
             *                 type: string
             *                 example: XAF
             *               from:
             *                 type: string
             *                 example: "677123456"
             *               description:
             *                 type: string
             *               external_reference:
             *                 type: string
             *     responses:
             *       201:
             *         description: Collection initiated successfully.
             *       500:
             *         description: Internal Server Error.
             */
            router.post("/", campayPaymentIntentController.collect);
          })
        );

        router.use(
          "/campayPaymentIntent",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/campayPaymentIntent/{reference}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - CamPay Payment Intents
             *     operationId: getCampayTransaction
             *     summary: Get CamPay transaction status.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *      - in: path
             *        name: reference
             *        schema:
             *          type: string
             *        required: true
             *     responses:
             *       200:
             *         description: Transaction status retrieved.
             *       500:
             *         description: Internal Server Error.
             */
            router.get("/:reference", campayPaymentIntentController.getTransaction);
          })
        );
      })
    );
  }
}

const campayPaymentIntentRoutes = new CampayPaymentIntentRoutes();
export default campayPaymentIntentRoutes;
