import express, { Router } from "express";
import routesGrouping from "../../../utils/routes-grouping.util";
import stripePaymentIntentController from "./stripe-payment-intent.controller";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-03
 *
 * Class StripePaymentIntentRoutes
 */
class StripePaymentIntentRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all stripe payment intents routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-03
   *
   * @returns {Router} all stripe payment intents routes
   */
  public stripePaymentIntentRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/stripePaymentIntents",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntents:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: store
             *     summary: Create a new stripe payment intent.
             *     description: Add stripe payment intent into the system.
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
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               amount:
             *                 type: number
             *                 description: Amount intended to be collected by
             *                      this PaymentIntent. A positive integer
             *                      representing how much to charge in the
             *                      smallest currency unit (e.g., 100 cents to
             *                      charge $1.00 or 100 to charge ¥100, a
             *                      zero-decimal currency). The minimum amount
             *                      is $0.50 US or equivalent in charge
             *                      currency. The amount value supports up to
             *                      eight digits (e.g., a value of 99999999 for
             *                      a USD charge of $999,999.99).
             *                 example: 2000
             *               currency:
             *                 type: string
             *                 description: Three-letter ISO currency code, in
             *                          lowercase. Must be a supported currency.
             *                 example: USD
             *               confirm:
             *                 type: boolean
             *                 description: Set to true to attempt to confirm
             *                              this PaymentIntent immediately.
             *                 example: false
             *               customer:
             *                 type: string
             *                 description: ID of the Customer this
             *                          PaymentIntent belongs to, if one exists.
             *               payment_method:
             *                 type: string
             *                 description: ID of the payment method
             *                   (a PaymentMethod, Card, or compatible Source
             *                    object) to attach to this PaymentIntent.
             *               description:
             *                 type: string
             *                 description: An arbitrary string attached to the
             *                     object. Often useful for displaying to users.
             *             required:
             *               - amount
             *               - currency
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               amount:
             *                 type: number
             *                 description: Amount intended to be collected by
             *                      this PaymentIntent. A positive integer
             *                      representing how much to charge in the
             *                      smallest currency unit (e.g., 100 cents to
             *                      charge $1.00 or 100 to charge ¥100, a
             *                      zero-decimal currency). The minimum amount
             *                      is $0.50 US or equivalent in charge
             *                      currency. The amount value supports up to
             *                      eight digits (e.g., a value of 99999999 for
             *                      a USD charge of $999,999.99).
             *                 example: 2000
             *                 required: true
             *               currency:
             *                 type: string
             *                 description: Three-letter ISO currency code, in
             *                          lowercase. Must be a supported currency.
             *                 example: USD
             *                 required: true
             *               confirm:
             *                 type: boolean
             *                 description: Set to true to attempt to confirm
             *                              this PaymentIntent immediately.
             *                 example: false
             *               customer:
             *                 type: string
             *                 description: ID of the Customer this
             *                          PaymentIntent belongs to, if one exists.
             *               payment_method:
             *                 type: string
             *                 description: ID of the payment method
             *                   (a PaymentMethod, Card, or compatible Source
             *                    object) to attach to this PaymentIntent.
             *               description:
             *                 type: string
             *                 description: An arbitrary string attached to the
             *                     object. Often useful for displaying to users.
             *             required:
             *               - amount
             *               - currency
             *
             *     responses:
             *       201:
             *         description: Stripe payment intent successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
            router.post("/", stripePaymentIntentController.store);

            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntents:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: showAllStripePaymentIntents
             *     summary: Get all stripe payment intents.
             *     description: Get all stripe payment intents from the system.
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
             *         description: The stripe payment intents have been
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
             *                      $ref: '#/components/schemas/StripePaymentIntent'
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
              stripePaymentIntentController.getStripePaymentIntents
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntents/stripeCustomer/{stripeCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: showByStripeCustomer
             *     summary: Get stripe payment intents by stripe customer ID.
             *     description: Get stripe payment intents by stripe customer
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
             *         description: The stripe payment intents have successfully
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
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
              stripePaymentIntentController.getStripePaymentIntentsByCustomer
            );
          })
        );

        router.use(
          "/stripePaymentIntent",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntent/{stripePaymentIntentId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: show
             *     summary: Get a stripe payment intent by ID.
             *     description: Get a stripe payment intent by id from
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
             *        name: stripePaymentIntentId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment intent to get
             *
             *     responses:
             *       200:
             *         description: The stripe payment intent has successfully
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
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
              "/:stripePaymentIntentId",
              stripePaymentIntentController.getStripePaymentIntentById
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntent/{stripePaymentIntentId}/confirm:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: confirmStripePaymentIntent
             *     summary: Confirm a stripe payment intent.
             *     description: Confirm a stripe payment intent.
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
             *        name: stripePaymentIntentId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment intent to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               receipt_email:
             *                 type: string
             *                 description: Email address that the receipt for
             *                      the resulting payment will be sent to.
             *               return_url:
             *                 type: string
             *                 description: The URL to redirect your customer
             *                    back to after they authenticate or cancel
             *                    their payment on the payment method’s app or
             *                    site.
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               receipt_email:
             *                 type: string
             *                 description: Email address that the receipt for
             *                      the resulting payment will be sent to.
             *               return_url:
             *                 type: string
             *                 description: The URL to redirect your customer
             *                    back to after they authenticate or cancel
             *                    their payment on the payment method’s app or
             *                    site.
             *
             *     responses:
             *       200:
             *         description: The stripe payment intent successfully
             *                      confirm.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
            router.post(
              "/:stripePaymentIntentId/confirm",
              stripePaymentIntentController.confirmStripePaymentIntent
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntent/{stripePaymentIntentId}/cancel:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: cancelStripePaymentIntent
             *     summary: Cancel stripe payment intent.
             *     description: Cancel stripe payment intent.
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
             *        name: stripePaymentIntentId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment intent to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               cancellation_reason:
             *                 type: string
             *                 description: Reason for canceling this
             *                    PaymentIntent. Possible values are duplicate.
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               cancellation_reason:
             *                 type: string
             *                 description: Reason for canceling this
             *                    PaymentIntent. Possible values are duplicate.
             *
             *     responses:
             *       200:
             *         description: The stripe payment intent successfully
             *                      cancelled.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
            router.post(
              "/:stripePaymentIntentId/cancel",
              stripePaymentIntentController.cancelStripePaymentIntent
            );

            /**
             * @swagger
             * /v1/{lang}/stripePaymentIntent/{stripePaymentIntentId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Payment Intent
             *     operationId: updateStripePaymentIntent
             *     summary: Update a stripe payment intent by ID.
             *     description: Update a stripe payment intent by ID.
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
             *        name: stripePaymentIntentId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the stripe payment intent to get
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
             *                example: payment_intent
             *              amount:
             *                type: number
             *                example: 2000
             *              amount_capturable:
             *                type: number
             *                example: 0
             *              amount_details:
             *                type: object
             *                properties:
             *                  tip:
             *                   type: object
             *              amount_received:
             *                type: number
             *              application:
             *                type: string
             *              application_fee_amount:
             *                type: string
             *              automatic_payment_methods:
             *                type: object
             *                properties:
             *                  enabled:
             *                    type: boolean
             *                    example: true
             *              canceled_at:
             *                type: number
             *              cancellation_reason:
             *                type: string
             *              capture_method:
             *                type: string
             *              client_secret:
             *                type: string
             *              confirmation_method:
             *                type: string
             *              currency:
             *                type: string
             *                example: USD
             *              customer:
             *                type: string
             *              description:
             *                type: string
             *              invoice:
             *                type: string
             *              last_payment_error:
             *                type: string
             *              latest_charge:
             *                type: string
             *              livemode:
             *                type: boolean
             *                example: false
             *              metadata:
             *                type: object
             *                properties:
             *                  order_id:
             *                    type: string
             *              next_action:
             *                type: string
             *              on_behalf_of:
             *                type: string
             *              payment_method:
             *                type: string
             *              payment_method_options:
             *                type: object
             *                properties:
             *                  card:
             *                    type: object
             *                    properties:
             *                      installments:
             *                        type: string
             *                      mandate_options:
             *                        type: string
             *                      network:
             *                        type: string
             *                      request_three_d_secure:
             *                        type: string
             *              payment_method_types:
             *                type: array
             *                items:
             *              processing:
             *                type: string
             *              receipt_email:
             *                type: string
             *              review:
             *                type: string
             *              setup_future_usage:
             *                type: string
             *              shipping:
             *                type: string
             *              statement_descriptor:
             *                type: string
             *              statement_descriptor_suffix:
             *                type: string
             *              status:
             *                type: string
             *              transfer_data:
             *                type: string
             *              transfer_group:
             *                type: string
             *
             *     responses:
             *       200:
             *         description: The stripe payment intent has
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
             *                    $ref: '#/components/schemas/StripePaymentIntent'
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
              "/:stripePaymentIntentId",
              stripePaymentIntentController.update
            );
          })
        );
      })
    );
  }
}

const stripePaymentIntentRoutes = new StripePaymentIntentRoutes();
export default stripePaymentIntentRoutes;