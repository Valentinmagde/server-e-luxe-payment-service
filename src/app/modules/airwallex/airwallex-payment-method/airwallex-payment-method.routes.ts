import express, { Router } from "express";
import routesGrouping from "../../../utils/routes-grouping.util";
import airwallexPaymentMethodController from "./airwallex-payment-method.controller";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-29
 *
 * Class AirwallexPaymentMethodRoutes
 */
class AirwallexPaymentMethodRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all airwallex payment methods routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @returns {Router} all airwallex payment methods routes
   */
  public airwallexPaymentMethodRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/airwallexPaymentMethods",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethods:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: store
             *     summary: Create a new airwallex payment method.
             *     description: Add airwallex payment method into the system.
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
             *               type:
             *                 type: string
             *                 description: The type of the airwallex
             *                              PaymentMethod.
             *                 example: card
             *                 required: true
             *               card:
             *                 type: object
             *                 properties:
             *                   number:
             *                     type: number
             *                     description: The airwallex card number.
             *                     example: 4242424242424242
             *                     required: true
             *                   exp_month:
             *                     type: number
             *                     description: The airwallex card expiry month.
             *                     example: 12
             *                     required: true
             *                   exp_year:
             *                     type: number
             *                     description: The airwallex card expiry year.
             *                     example: 2034
             *                     required: true
             *                   cvc:
             *                     type: number
             *                     description: The airwallex card cvc.
             *                     example: 314
             *                     required: true
             *
             *     responses:
             *       201:
             *         description: Airwallex payment method successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.post("/", airwallexPaymentMethodController.store);

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethods:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: showAllAirwallexPaymentMethods
             *     summary: Get all airwallex payment methods.
             *     description: Get all airwallex payment methods from the system.
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
             *     responses:
             *       200:
             *         description: The airwallex payment methods have been
             *                      successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    type: array
             *                    items:
             *                      $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.get(
              "/",
              airwallexPaymentMethodController.getAirwallexPaymentMethods
            );

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethods/airwallexCustomer/{airwallexCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: showByAirwallexCustomer
             *     summary: Get airwallex payment methods by airwallex customer ID.
             *     description: Get airwallex payment methods by airwallex customer
             *                  id from the system.
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
             *        name: airwallexCustomerId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system
             *
             *     responses:
             *       200:
             *         description: The airwallex payment methods have successfully
             *                      retrieve.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.get(
              "/airwallexCustomer/:airwallexCustomerId",
              airwallexPaymentMethodController.getAirwallexPaymentMethodsByCustomer
            );
          })
        );

        router.use(
          "/airwallexPaymentMethod",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethod/{airwallexPaymentMethodId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: show
             *     summary: Get a airwallex payment method by ID.
             *     description: Get a airwallex payment method by id from
             *                  the system.
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
             *        name: airwallexPaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the airwallex payment method to get
             *
             *     responses:
             *       200:
             *         description: The airwallex payment method has successfully
             *                      retrieve.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.get(
              "/:airwallexPaymentMethodId",
              airwallexPaymentMethodController.getAirwallexPaymentMethodById
            );

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethod/{airwallexPaymentMethodId}/airwallexCustomer/disable:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: disablePaymentMethod
             *     summary: Disable a PaymentMethod from a Customer.
             *     description: Disable a PaymentMethod from a Customer.
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
             *        name: airwallexPaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the airwallex payment method to get
             *
             *     responses:
             *       200:
             *         description: The payment method detach successfully from
             *                      a customer.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.get(
              "/:airwallexPaymentMethodId/airwallexCustomer/disable",
              airwallexPaymentMethodController.disable
            );

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentMethod/{airwallexPaymentMethodId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Method
             *     operationId: updateAirwallexPaymentMethod
             *     summary: Update a airwallex payment method by ID.
             *     description: Update a airwallex payment method by ID.
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
             *        name: airwallexPaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the airwallex payment method to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *            type: object
             *            properties:
             *              object:
             *                type: string
             *                example: payment_method
             *              billing_details:
             *                type: object
             *                properties:
             *                  address:
             *                    type: object
             *                    properties:
             *                      city:
             *                        type: string
             *                      country:
             *                        type: string
             *                      line1:
             *                        type: string
             *                      line2:
             *                        type: string
             *                      postal_code:
             *                        type: string
             *                      state:
             *                        type: string
             *                  email:
             *                    type: string
             *                  name:
             *                    type: string
             *                  phone:
             *                    type: string
             *              card:
             *                type: object
             *                properties:
             *                  brand:
             *                    type: string
             *                  checks:
             *                    type: object
             *                    properties:
             *                      address_line1_check:
             *                        type: string
             *                      address_postal_code_check:
             *                        type: string
             *                      cvc_check:
             *                        type: string
             *                  country:
             *                    type: string
             *                  exp_month:
             *                    type: number
             *                  exp_year:
             *                    type: number
             *                  fingerprint:
             *                    type: string
             *                  funding:
             *                    type: string
             *                  generated_from:
             *                    type: string
             *                  last4:
             *                    type: number
             *                  networks:
             *                    type: object
             *                    properties:
             *                      available:
             *                        type: array
             *                        items:
             *                      preferred:
             *                        type: string
             *                  three_d_secure_usage:
             *                    type: object
             *                    properties:
             *                      supported:
             *                        type: boolean
             *                  wallet:
             *                    type: string
             *              balance:
             *                type: number
             *              customer:
             *                type: string
             *              livemode:
             *                type: boolean
             *                example: false
             *              metadata:
             *                type: object
             *                properties:
             *                  order_id:
             *                    type: string
             *              type:
             *                type: string
             *            required:
             *              - metadata
             *
             *     responses:
             *       200:
             *         description: The airwallex payment method has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentMethod'
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
            router.put(
              "/:airwallexPaymentMethodId",
              airwallexPaymentMethodController.update
            );
          })
        );
      })
    );
  }
}

const airwallexPaymentMethodRoutes = new AirwallexPaymentMethodRoutes();
export default airwallexPaymentMethodRoutes;
