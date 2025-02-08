import { Application, Request, Response } from "express";
import
  swaggerOptions
  from "../../resources/swagger/payment-docs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routesGrouping from "../utils/routes-grouping.util";
import statusCode from "../utils/status-code.util";
import errorNumbers from "../utils/error-numbers.util";
import customResponse from "../utils/custom-response.util";
import i18n from "../../core/i18n";
import setLocale from "../middlewares/set-locale.middleware";
import authorization from "../middlewares/authorization.middleware";
import
  paymentMethodRoutes
  from "../modules/payment-method/payment-method.routes";
import systemRoutes from "../modules/system/system.routes";
import
  stripeCustomerRoutes
  from "../modules/stripe-customer/stripe-customer.routes";
import
  stripePaymentMethodRoutes
  from "../modules/stripe-payment-method/stripe-payment-method.routes";
import
  stripePaymentIntentRoutes
  from "../modules/stripe-payment-intent/stripe-payment-intent.routes";
import paypalOrderRoutes from "../modules/paypal-order/paypal-order.routes";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-05
 *
 * Class Routes
 */
class Routes {
  private app: Application;
  private specs: object;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-05
   *
   * @param {Application} app express application
   */
  constructor(app: Application) {
    this.app = app;
    this.specs = swaggerJSDoc(swaggerOptions);
  }

  /**
   * Creating app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @returns {void}
   */
  public appRoutes(): void {
    this.app.use(
      "/v1",
      routesGrouping.group((router) => {
        router.use(
          "/:lang",
          setLocale.setLocale,
          authorization.isAuth,
          routesGrouping.group((router) => {

            // Includes payment method routes
            router.use(paymentMethodRoutes.paymentMethodRoutes());

            // Includes system routes
            router.use(systemRoutes.systemRoutes());

            // Includes stripe customer routes
            router.use(stripeCustomerRoutes.stripeCustomerRoutes());

            // Includes stripe payment method routes
            router.use(stripePaymentMethodRoutes.stripePaymentMethodRoutes());

            // Includes stripe payment intent routes
            router.use(stripePaymentIntentRoutes.stripePaymentIntentRoutes());

            // Includes paypal orders routes
            router.use(paypalOrderRoutes.paypalOrderRoutes());
          })
        );

        // Swagger documentation
        router.use(
          "/payments/docs",
          swaggerUi.serve, swaggerUi.setup(this.specs)
        );
        router.get("/payments/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(this.specs);
        });
      })
    );

    // error handler for not found router
    this.app.all("*", (req: Request, res: Response) => {
      const response = {
        status: statusCode.httpNotFound,
        errNo: errorNumbers.resourceNotFound,
        errMsg: i18n.__("others.routeNotFound"),
      };

      return customResponse.error(response, res);
    });
  }

  /**
   * Load routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @returns {void}
   */
  public routesConfig(): void {
    this.appRoutes();
  }
}

export default Routes;
