import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../../utils/routes-grouping.util";
import stripeCustomerController from "./stripe-customer.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-30
 *
 * Class StripeCustomerRoutes
 */
class StripeCustomerRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-30
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all stripe customers routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-30
   *
   * @returns {Router} all stripe customers routes
   */
  public stripeCustomerRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/stripeCustomers",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripeCustomers:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: store
             *     summary: Create a new stripe customer.
             *     description: Add stripe customer into the system.
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
             *               name:
             *                 type: string
             *                 description: The stripe customer name.
             *               email:
             *                 type: string
             *                 description: The stripe customer email.
             *               phone:
             *                 type: string
             *                 description: The stripe customer phone.
             *               user:
             *                 type: string
             *                 description: The user id.
             *             required:
             *               - name
             *               - email
             *               - phone
             *               - user
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The stripe customer name.
             *               email:
             *                 type: string
             *                 description: The stripe customer email.
             *               phone:
             *                 type: string
             *                 description: The stripe customer phone.
             *               user:
             *                 type: string
             *                 description: The user id.
             *             required:
             *               - name
             *               - email
             *               - phone
             *               - user
             *
             *     responses:
             *       201:
             *         description: Stripe customer successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripeCustomer'
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
            router.post("/", stripeCustomerController.store);

            /**
             * @swagger
             * /v1/{lang}/stripeCustomers:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: showAllStripeCustomers
             *     summary: Get all stripe customers.
             *     description: Get all stripe customers from the system.
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
             *         description: The stripe customers have been successfully
             *                      recovered.
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
             *                      $ref: '#/components/schemas/StripeCustomer'
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
            router.get("/", stripeCustomerController.getStripeCustomers);

            /**
             * @swagger
             * /v1/{lang}/stripeCustomers/user/{userId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: showByUser
             *     summary: Get stripe customers by user ID.
             *     description: Get stripe customers by user id from
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
             *        name: userId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system
             *
             *     responses:
             *       200:
             *         description: The stripe customers have successfully
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
             *                    $ref: '#/components/schemas/StripeCustomer'
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
              "/user/:userId",
              stripeCustomerController.getStripeCustomersByUser
            );
          })
        );

        router.use(
          "/stripeCustomer",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/stripeCustomer/{stripeCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: show
             *     summary: Get a stripe customer by ID.
             *     description: Get a stripe customer by id from the system.
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
             *        description: String ID of the stripe customer to get
             *
             *     responses:
             *       200:
             *         description: The stripe customer has successfully
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
             *                    $ref: '#/components/schemas/StripeCustomer'
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
              "/:stripeCustomerId",
              stripeCustomerController.getStripeCustomerById
            );

            /**
             * @swagger
             * /v1/{lang}/stripeCustomer/{stripeCustomerId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: stripeCustomerUpdate
             *     summary: Update a stripe customer by ID.
             *     description: Update a stripe customer by ID.
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
             *        description: String ID of the stripe customer to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *            type: object
             *            properties:
             *              object:
             *                type: string
             *                example: customer
             *              address:
             *                type: string
             *              balance:
             *                type: number
             *                example: 0
             *              name:
             *                type: string
             *              currency:
             *                type: string
             *              default_source:
             *                type: string
             *              delinquent:
             *                type: boolean
             *                example: false
             *              description:
             *                type: string
             *              discount:
             *                type: string
             *              email:
             *                type: string
             *              invoice_prefix:
             *                type: string
             *              invoice_settings:
             *                type: object
             *                properties:
             *                  custom_field:
             *                    type: string
             *                  default_payment_method:
             *                    type: string
             *                  footer:
             *                    type: string
             *                  rendering_options:
             *                    type: string
             *              livemode:
             *                type: boolean
             *                example: false
             *              metadata:
             *                type: object
             *                properties:
             *                  order_id:
             *                    type: string
             *              next_invoice_sequence:
             *                type: number
             *              phone:
             *                type: string
             *              preferred_locales:
             *                type: array
             *              shipping:
             *                type: string
             *              tax_exempt:
             *                type: string
             *              test_clock:
             *                type: string
             *              user:
             *                type: string
             *            required:
             *              - name
             *              - email
             *              - phone
             *              - user
             *
             *         application/json:
             *           schema:
             *            type: object
             *            properties:
             *              object:
             *                type: string
             *                example: customer
             *              address:
             *                type: string
             *              balance:
             *                type: number
             *                example: 0
             *              name:
             *                type: string
             *              currency:
             *                type: string
             *              default_source:
             *                type: string
             *              delinquent:
             *                type: boolean
             *                example: false
             *              description:
             *                type: string
             *              discount:
             *                type: string
             *              email:
             *                type: string
             *              invoice_prefix:
             *                type: string
             *              invoice_settings:
             *                type: object
             *                properties:
             *                  custom_field:
             *                    type: string
             *                  default_payment_method:
             *                    type: string
             *                  footer:
             *                    type: string
             *                  rendering_options:
             *                    type: string
             *              livemode:
             *                type: boolean
             *                example: false
             *              metadata:
             *                type: object
             *                properties:
             *                  order_id:
             *                    type: string
             *              next_invoice_sequence:
             *                type: number
             *              phone:
             *                type: string
             *              preferred_locales:
             *                type: array
             *              shipping:
             *                type: string
             *              tax_exempt:
             *                type: string
             *              test_clock:
             *                type: string
             *              user:
             *                type: string
             *            required:
             *              - name
             *              - email
             *              - phone
             *              - user
             *
             *     responses:
             *       200:
             *         description: The stripe customer has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/StripeCustomer'
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
            router.put("/:stripeCustomerId", stripeCustomerController.update);

            /**
             * @swagger
             * /v1/{lang}/stripeCustomer/{stripeCustomerId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Stripe Customer
             *     operationId: delete
             *     summary: Delete a stripe customer by ID.
             *     description: Delete a stripe customer by ID.
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
             *        description: String ID of the stripe customer to delete
             *
             *     responses:
             *       204:
             *         description: The stripe customer delete successfully.
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
            router.delete(
              "/:stripeCustomerId",
              stripeCustomerController.delete
            );
          })
        );
      })
    );
  }
}

const stripeCustomerRoutes = new StripeCustomerRoutes();
export default stripeCustomerRoutes;