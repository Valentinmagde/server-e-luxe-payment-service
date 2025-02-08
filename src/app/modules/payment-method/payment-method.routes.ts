import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import paymentMethodController from "./payment-method.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class PaymentMethodRoutes
 */
class PaymentMethodRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all payment methods routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @returns {Router} all payment methods routes
   */
  public paymentMethodRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/paymentMethods",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/paymentMethods:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: store
             *     summary: Create a new payment method.
             *     description: Add payment method into the system.
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
             *                 description: The payment method name.
             *                 example: Stripe
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *                 example: stripe
             *               description:
             *                 type: string
             *                 description: The payment method description
             *             required:
             *               - name
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The payment method name.
             *                 example: Stripe
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *                 example: stripe
             *               description:
             *                 type: string
             *                 description: The payment method description
             *             required:
             *               - name
             *
             *     responses:
             *       201:
             *         description: Payment method successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaymentMethod'
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
            router.post("/", paymentMethodController.store);

            /**
             * @swagger
             * /v1/{lang}/paymentMethods:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: showAllPaymentMethods
             *     summary: Get all payment methods.
             *     description: Get all payment methods from the system.
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
             *         description: The payment methods have been successfully
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
             *                      $ref: '#/components/schemas/PaymentMethod'
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
            router.get("/", paymentMethodController.getPaymentMethods);

            /**
             * @swagger
             * /v1/{lang}/paymentMethods/system/{systemId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: showBySystem
             *     summary: Get payment methods by system ID.
             *     description: Get payment methods by system id from
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
             *        name: systemId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system
             *
             *     responses:
             *       200:
             *         description: The payment methods have successfully
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
             *                    $ref: '#/components/schemas/PaymentMethod'
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
              "/system/:systemId",
              paymentMethodController.getPaymentMethodsBySystem
            );
          })
        );

        router.use(
          "/paymentMethod",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/paymentMethod/{paymentMethodId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: show
             *     summary: Get a payment method by ID.
             *     description: Get a payment method by id from the system.
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
             *        name: paymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to get
             *
             *     responses:
             *       200:
             *         description: The payment method has successfully
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
             *                    $ref: '#/components/schemas/PaymentMethod'
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
              "/:paymentMethodId",
              paymentMethodController.getPaymentMethodById
            );

            /**
             * @swagger
             * /v1/{lang}/paymentMethod/slug/{paymentMethodSlug}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: showBySlug
             *     summary: Get a payment method by slug.
             *     description: Get a payment method by slug from the system.
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
             *        name: paymentMethodSlug
             *        schema:
             *          type: string
             *        required: true
             *        description: String slug of the payment method to get
             *
             *     responses:
             *       200:
             *         description: The payment method has successfully
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
             *                    $ref: '#/components/schemas/PaymentMethod'
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
              "/slug/:paymentMethodSlug",
              paymentMethodController.getPaymentMethodBySlug
            );

            /**
             * @swagger
             * /v1/{lang}/paymentMethod/{paymentMethodId}/system/{systemId}/assign:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: assignSystem
             *     summary: Assign a system to a payment method.
             *     description: Assign a system to a payment method.
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
             *        name: paymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to get
             *      - in: path
             *        name: systemId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system to get
             *
             *     responses:
             *       200:
             *         description: The system successfully assigned to a
             *                      payment method.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaymentMethod'
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
              "/:paymentMethodId/system/:systemId/assign",
              paymentMethodController.assign
            );

            /**
             * @swagger
             * /v1/{lang}/paymentMethod/{paymentMethodId}/system/{systemId}/unassign:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: unassignSystem
             *     summary: Unassign a system to a payment method.
             *     description: Unassign a system to a payment method.
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
             *        name: paymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to get
             *      - in: path
             *        name: systemId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the system to get
             *
             *     responses:
             *       200:
             *         description: The system successfully unassigned to a
             *                      payment method.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaymentMethod'
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
              "/:paymentMethodId/system/:systemId/unassign",
              paymentMethodController.unassign
            );

            /**
             * @swagger
             * /v1/{lang}/paymentMethod/{paymentMethodId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: paymentMethodUpdate
             *     summary: Update a payment method by ID.
             *     description: Update a payment method by ID.
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
             *        name: paymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The payment method name.
             *                 example: Stripe
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *                 example: stripe
             *               description:
             *                 type: string
             *                 description: The payment method description
             *             required:
             *               - name
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The payment method name.
             *                 example: Stripe
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *                 example: stripe
             *               description:
             *                 type: string
             *                 description: The payment method description
             *             required:
             *               - name
             *     responses:
             *       200:
             *         description: The payment method has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/PaymentMethod'
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
            router.put("/:paymentMethodId", paymentMethodController.update);

            /**
             * @swagger
             * /v1/{lang}/paymentMethod/{paymentMethodId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Payment Method
             *     operationId: paymentMethodDelete
             *     summary: Delete a payment mehtod by ID.
             *     description: Delete a payment method by ID.
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
             *        name: paymentMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the payment method to delete
             *
             *     responses:
             *       204:
             *         description: The payment method delete successfully.
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
            router.delete("/:paymentMethodId", paymentMethodController.delete);
          })
        );
      })
    );
  }
}

const paymentMethodRoutes = new PaymentMethodRoutes();
export default paymentMethodRoutes;
