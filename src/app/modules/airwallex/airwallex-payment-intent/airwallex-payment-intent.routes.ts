import express, { Router } from "express";
import routesGrouping from "../../../utils/routes-grouping.util";
import airwallexPaymentIntentController from "./airwallex-payment-intent.controller";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-29
 *
 * Class AirwallexPaymentIntentRoutes
 */
class AirwallexPaymentIntentRoutes {
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
   * Creating all airwallex payment intents routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @returns {Router} all airwallex payment intents routes
   */
  public airwallexPaymentIntentRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/airwallexPaymentIntents",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentIntents:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: store
             *     summary: Create a new airwallex payment intent.
             *     description: Add airwallex payment intent into the system.
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
            router.post("/", airwallexPaymentIntentController.store);

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentIntents:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: showAllAirwallexPaymentIntents
             *     summary: Get all airwallex payment intents.
             *     description: Get all airwallex payment intents from the system.
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
             *         description: The airwallex payment intents have been
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
             *                      $ref: '#/components/schemas/AirwallexPaymentIntent'
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
              airwallexPaymentIntentController.getAirwallexPaymentIntents
            );

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentIntents/airwallexCustomer/{airwallexCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: showByAirwallexCustomer
             *     summary: Get airwallex payment intents by airwallex customer ID.
             *     description: Get airwallex payment intents by airwallex customer
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
             *         description: The airwallex payment intents have successfully
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
             *                    $ref: '#/components/schemas/AirwallexPaymentIntent'
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
              airwallexPaymentIntentController.getAirwallexPaymentIntentsByCustomer
            );
          })
        );

        router.use(
          "/airwallexPaymentIntent",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentIntent/{airwallexPaymentIntentId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: show
             *     summary: Get a airwallex payment intent by ID.
             *     description: Get a airwallex payment intent by id from
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
             *        name: airwallexPaymentIntentId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the airwallex payment intent to get
             *
             *     responses:
             *       200:
             *         description: The airwallex payment intent has successfully
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
             *                    $ref: '#/components/schemas/AirwallexPaymentIntent'
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
              "/:airwallexPaymentIntentId",
              airwallexPaymentIntentController.getAirwallexPaymentIntentById
            );

            /**
             * @swagger
             * /v1/{lang}/airwallexPaymentIntent/{airwallexPaymentIntentId}/confirm:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: confirmAirwallexPaymentIntent
             *     summary: Confirm a airwallex payment intent.
             *     description: Confirm a airwallex payment intent.
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
             *        name: airwallexPaymentIntentId
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
             *         description: The airwallex payment intent successfully
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
             *                    $ref: '#/components/schemas/AirwallexPaymentIntent'
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
              "/:airwallexPaymentIntentId/confirm",
              airwallexPaymentIntentController.confirmAirwallexPaymentIntent
            );

            /**
             * @sagger
             * /v1/{lang}/airwallexPaymentIntent/{airwallexPaymentIntentId}/capture:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Payment Intent
             *     operationId: captureAirwallexPaymentIntent
             *     summary: Capture a airwallex payment intent.
             *     description: Capture a airwallex payment intent.
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
             *        name: airwallexPaymentIntentId
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
             *               amount_to_capture:
             *                 type: number
             *                 description: The amount to capture from the
             *                      PaymentIntent, which must be less than or
             *                      equal to the original amount. Any additional
             *                      amount will be automatically refunded.
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               amount_to_capture:
             *                 type: number
             *                 description: The amount to capture from the
             *                      PaymentIntent, which must be less than or
             *                      equal to the original amount. Any additional
             *                      amount will be automatically refunded.
             *
             *     responses:
             *       200:
             *         description: The airwallex payment intent successfully
             *                      captured.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexPaymentIntent'
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
             */
            router.post(
              "/:airwallexPaymentIntentId/capture",
              airwallexPaymentIntentController.captureAirwallexPaymentIntent
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
              "/:airwallexPaymentIntentId/cancel",
              airwallexPaymentIntentController.cancelAirwallexPaymentIntent
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
             *         description: The airwallex payment intent has
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
             *                    $ref: '#/components/schemas/AirwallexPaymentIntent'
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
              "/:airwallexPaymentIntentId",
              airwallexPaymentIntentController.update
            );
          })
        );
      })
    );
  }
}

const airwallexPaymentIntentRoutes = new AirwallexPaymentIntentRoutes();
export default airwallexPaymentIntentRoutes;
