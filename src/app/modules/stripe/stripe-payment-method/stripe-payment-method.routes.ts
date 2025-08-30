import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../../utils/routes-grouping.util";
import stripePaymentMethodController from "./stripe-payment-method.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-30
 *
 * Class StripePaymentMethodRoutes
 */
class StripePaymentMethodRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all stripe payment methods routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-02
   *
   * @returns {Router} all stripe payment methods routes
   */
  public stripePaymentMethodRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/stripePaymentMethods",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethods:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: store
             *     summary: Create a new stripe payment method.
             *     description: Add stripe payment method into the system.
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
             *                 description: The type of the stripe
             *                              PaymentMethod.
             *                 example: card
             *                 required: true
             *               card:
             *                 type: object
             *                 properties:
             *                   number:
             *                     type: number
             *                     description: The stripe card number.
             *                     example: 4242424242424242
             *                     required: true
             *                   exp_month:
             *                     type: number
             *                     description: The stripe card expiry month.
             *                     example: 12
             *                     required: true
             *                   exp_year:
             *                     type: number
             *                     description: The stripe card expiry year.
             *                     example: 2034
             *                     required: true
             *                   cvc:
             *                     type: number
             *                     description: The stripe card cvc.
             *                     example: 314
             *                     required: true
             *
             *     responses:
             *       201:
             *         description: Stripe payment method successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
            router.post("/", stripePaymentMethodController.store);

            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethods:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: showAllStripePaymentMethods
             *     summary: Get all stripe payment methods.
             *     description: Get all stripe payment methods from the system.
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
             *         description: The stripe payment methods have been
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
             *                      $ref: '#/components/schemas/StripePaymentMethod'
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
              stripePaymentMethodController.getStripePaymentMethods
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethods/stripeCustomer/{stripeCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: showByStripeCustomer
             *     summary: Get stripe payment methods by stripe customer ID.
             *     description: Get stripe payment methods by stripe customer
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
             *        name: stripeCustomerId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system
             *
             *     responses:
             *       200:
             *         description: The stripe payment methods have successfully
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
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
              "/stripeCustomer/:stripeCustomerId",
              stripePaymentMethodController.getStripePaymentMethodsByCustomer
            );
          })
        );

        router.use(
          "/stripePaymentMethod",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethod/{stripePaymentMethodId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: show
             *     summary: Get a stripe payment method by ID.
             *     description: Get a stripe payment method by id from
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
             *        name: stripePaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment method to get
             *
             *     responses:
             *       200:
             *         description: The stripe payment method has successfully
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
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
              "/:stripePaymentMethodId",
              stripePaymentMethodController.getStripePaymentMethodById
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethod/{stripePaymentMethodId}/stripeCustomer/{stripeCustomerId}/attach:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: attachPaymentMethod
             *     summary: Attach a payment method to a customer.
             *     description: Attach a payment method to a customer.
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
             *        name: stripePaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to get
             *      - in: path
             *        name: stripeCustomerId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe customer to get
             *
             *     responses:
             *       200:
             *         description: The stripe payment method successfully
             *                      attached to a stripe customer.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
              "/:stripePaymentMethodId/stripeCustomer/:stripeCustomerId/attach",
              stripePaymentMethodController.attach
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethod/{stripePaymentMethodId}/stripeCustomer/detach:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: detachPaymentMethod
             *     summary: Detach a PaymentMethod from a Customer.
             *     description: Detach a PaymentMethod from a Customer.
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
             *        name: stripePaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment method to get
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
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
              "/:stripePaymentMethodId/stripeCustomer/detach",
              stripePaymentMethodController.detach
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentMethod/{stripePaymentMethodId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Method
             *     operationId: updateStripePaymentMethod
             *     summary: Update a stripe payment method by ID.
             *     description: Update a stripe payment method by ID.
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
             *        name: stripePaymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment method to get
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
             *         description: The stripe payment method has
             *                      successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentMethod'
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
              "/:stripePaymentMethodId",
              stripePaymentMethodController.update
            );
          })
        );
      })
    );
  }
}

const stripePaymentMethodRoutes = new StripePaymentMethodRoutes();
export default stripePaymentMethodRoutes;