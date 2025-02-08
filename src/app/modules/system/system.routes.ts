import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import systemController from "./system.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-13
 *
 * Class SystemRoutes
 */
class SystemRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all system routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @returns {Router} all system routes
   */
  public systemRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/systems",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/systems:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: store
             *     summary: Create a new system.
             *     description: Add system into the system.
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
             *                 description: The system name.
             *               description:
             *                 type: string
             *                 description: The system description
             *             required:
             *               - name
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The system name.
             *               description:
             *                 type: string
             *                 description: The system description
             *             required:
             *               - name
             *
             *     responses:
             *       201:
             *         description: System successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/System'
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
            router.post("/", systemController.store);

            /**
             * @swagger
             * /v1/{lang}/systems:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: showAllSystems
             *     summary: Get all systems.
             *     description: Get all systems from the system.
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
             *         description: The systems have been successfully
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
             *                      $ref: '#/components/schemas/System'
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
            router.get("/", systemController.getSystems);
          })
        );

        router.use(
          "/system",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/system/{systemId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: show
             *     summary: Get a system by ID.
             *     description: Get a system by id from the system.
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
             *        description: String ID of the system to get
             *
             *     responses:
             *       200:
             *         description: The system has successfully
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
             *                    $ref: '#/components/schemas/System'
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
              "/:systemId",
              systemController.getSystemById
            );

            /**
             * @swagger
             * /v1/{lang}/system:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: showByName
             *     summary: Get a system by name.
             *     description: Get a system by name from the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: query
             *        name: name
             *        schema:
             *          type: string
             *        required: true
             *        description: String name of the system to get
             *
             *     responses:
             *       200:
             *         description: The system has successfully
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
             *                    $ref: '#/components/schemas/System'
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
            router.get("/", systemController.getSystemByName);

            /**
             * @swagger
             * /v1/{lang}/system/{systemId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: systemUpdate
             *     summary: Update a system by ID.
             *     description: Update a system by ID.
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
             *        description: String ID of the system to get
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
             *                 description: The system name.
             *               description:
             *                 type: string
             *                 description: The system description
             *             required:
             *               - name
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The system name.
             *               description:
             *                 type: string
             *                 description: The system description
             *             required:
             *               - name
             *     responses:
             *       200:
             *         description: The system has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/System'
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
            router.put("/:systemId", systemController.update);

            /**
             * @swagger
             * /v1/{lang}/system/{systemId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - System
             *     operationId: systemDelete
             *     summary: Delete a system by ID.
             *     description: Delete a system by ID.
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
             *        description: String ID of the system to delete
             *
             *     responses:
             *       204:
             *         description: The system delete successfully.
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
            router.delete("/:systemId", systemController.delete);
          })
        );
      })
    );
  }
}

const systemRoutes = new SystemRoutes();
export default systemRoutes;