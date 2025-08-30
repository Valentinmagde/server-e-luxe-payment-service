import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../../utils/routes-grouping.util";
import paypalOrderController from "./paypal-order.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-01-03
 *
 * Class PaypalOrderRoutes
 */
class PaypalOrderRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all paypal order routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-01-03
   *
   * @returns {Router} all paypal order routes
   */
  public paypalOrderRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/paypalOrders",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/paypalOrders:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Paypal Orders
             *     operationId: createOrder
             *     summary: Create a new paypal order.
             *     description: Add paypal order into the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               intent:
             *                 type: string
             *                 description: The intent to either capture payment immediately
             *                    or authorize a payment for an order after order creation.
             *                 example: CAPTURE
             *                 required: true
             *               purchaseUnits:
             *                 type: array
             *                 items:
             *                   type: object
             *                   description: Details about the purchase units in the order.
             *                 required: true
             *
             *     responses:
             *       201:
             *         description: Paypal order successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaypalOrder'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.post("/", paypalOrderController.createOrder);
          })
        );

        router.use(
          "/paypalOrder",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/paypalOrder/{paypalOrderId}/capture:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Paypal Orders
             *     operationId: captureOrder
             *     summary: Capture paypal order.
             *     description: Capture paypal order by ID.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: paypalOrderId
             *        schema:
             *          type: string
             *        required: true
             *        description: Paypal order id to capture
             *
             *     responses:
             *       200:
             *         description: The paypal order has
             *                      successfully captured.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaypalOrder'
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.post("/:paypalOrderId/capture", paypalOrderController.captureOrder);
          })
        );
      })
    );
  }
}

const paypalOrderRoutes = new PaypalOrderRoutes();
export default paypalOrderRoutes;
