import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../../utils/routes-grouping.util";
import airwallexCustomerController from "./airwallex-customer.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2025-08-29
 *
 * Class AirwallexCustomerRoutes
 */
class AirwallexCustomerRoutes {
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
   * Creating all airwallex customers routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2025-08-29
   *
   * @returns {Router} all airwallex customers routes
   */
  public airwallexCustomerRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/airwallexCustomers",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexCustomers:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Customer
             *     operationId: store
             *     summary: Create a new airwallex customer.
             *     description: Add airwallex customer into the system.
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
             *         description: Airwallex customer successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexCustomer'
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
            router.post("/", airwallexCustomerController.store);

            /**
             * @swagger
             * /v1/{lang}/airwallexCustomers:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Customer
             *     operationId: showAllAirwallexCustomers
             *     summary: Get all airwallex customers.
             *     description: Get all airwallex customers from the system.
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
             *         description: The airwallex customers have been successfully
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
             *                      $ref: '#/components/schemas/AirwallexCustomer'
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
            router.get("/", airwallexCustomerController.getAirwallexCustomers);

            /**
             * @swagger
             * /v1/{lang}/airwallexCustomers/user/{userId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Customer
             *     operationId: showByUser
             *     summary: Get airwallex customers by user ID.
             *     description: Get airwallex customers by user id from
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
             *         description: The airwallex customers have successfully
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
             *                    $ref: '#/components/schemas/AirwallexCustomer'
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
              airwallexCustomerController.getAirwallexCustomersByUser
            );
          })
        );

        router.use(
          "/airwallexCustomer",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/airwallexCustomer/{airwallexCustomerId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Customer
             *     operationId: show
             *     summary: Get a airwallex customer by ID.
             *     description: Get a airwallex customer by id from the system.
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
             *        description: String ID of the airwallex customer to get
             *
             *     responses:
             *       200:
             *         description: The airwallex customer has successfully
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
             *                    $ref: '#/components/schemas/AirwallexCustomer'
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
              "/:airwallexCustomerId",
              airwallexCustomerController.getAirwallexCustomerById
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
             *         description: The airwallex customer has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/AirwallexCustomer'
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
            router.put("/:airwallexCustomerId", airwallexCustomerController.update);

            /**
             * @swagger
             * /v1/{lang}/airwallexCustomer/{airwallexCustomerId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Airwallex Customer
             *     operationId: delete
             *     summary: Delete a airwallex customer by ID.
             *     description: Delete a airwallex customer by ID.
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
             *        description: String ID of the airwallex customer to delete
             *
             *     responses:
             *       204:
             *         description: The airwallex customer delete successfully.
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
              "/:airwallexCustomerId",
              airwallexCustomerController.delete
            );
          })
        );
      })
    );
  }
}

const airwallexCustomerRoutes = new AirwallexCustomerRoutes();
export default airwallexCustomerRoutes;
