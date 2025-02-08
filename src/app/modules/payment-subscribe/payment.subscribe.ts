import { slugify } from "../../utils/helpers.util";
import DBManager from "../../../core/db";
import rabbitmqManager from "../../../core/rabbitmq";
import paymentMethodService from "../payment-method/payment-method.service";
import paypalOrderService from "../paypal-order/paypal-order.service";
import stripeCustomerService from "../stripe-customer/stripe-customer.service";
import stripePaymentIntentService from "../stripe-payment-intent/stripe-payment-intent.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-16
 *
 * Class PaymentSubscribe
 */
class PaymentSubscribe {
  /**
   * Create payment intent
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-10
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async confirmPayment(): Promise<void> {
    try {
      const { channel, queue } = await rabbitmqManager.setupQueue(
        "eluxe.order.confirmPayment",
        "confirmPaymentQueue",
        "confirmPayment"
      );

      channel.consume(queue, async (msg: any) => {
        try {
          const data = JSON.parse(msg.content);
          const dbManager = new DBManager();

          // Connect to the database
          const dbConnection = await dbManager.asyncOnConnect();

          // Validate message structure
          // const validationError = this.validateMessage(data);
          // if (validationError) throw new Error(validationError);

          // Process payment
          await this.handleStripePayment(data, dbConnection);
        } catch (error) {
          console.error("Message processing failed:", error);
        } finally {
          channel.ack(msg); // Always acknowledge the message
        }
      });

      // const dbManager = new DBManager();

      // const exchangeName = "eluxe.order.confirmPayment";
      // const routingKey = "confirmPayment";
      // const queueName = "confirmPaymentQueue";

      // await rabbitmqManager.createChannel();
      // const channel = rabbitmqManager.channel;
      // await channel.assertExchange(exchangeName, "direct");
      // const q = await channel.assertQueue(queueName);
      // await channel.bindQueue(q.queue, exchangeName, routingKey);

      // channel.consume(q.queue, (msg: any) => {
      //   const data: any = JSON.parse(msg.content);

      //   dbManager
      //     .asyncOnConnect()
      //     .then((dbConenction) => {
      //       paymentMethodService
      //         .getPaymentMethodById(data.message.payment_method)
      //         .then((paymentMethod: any) => {
      //           if (paymentMethod !== null && paymentMethod !== undefined) {
      //             if (paymentMethod.slug === "stripe") {
      //               // Create stripe customer
      //               stripeCustomerService
      //                 .store({
      //                   name: data.message.name,
      //                   email: data.message.email,
      //                   phone: data.message.phone,
      //                   payment_method: data.message.payment_data.id,
      //                   user: data.message.user,
      //                 })
      //                 .then((createdStripeCustomer: any) => {
      //                   // Create payment intent
      //                   stripePaymentIntentService
      //                     .store({
      //                       amount: data.message.amount,
      //                       currency: data.message.currency,
      //                       customer: createdStripeCustomer.id,
      //                       confirm: data.message.confirm,
      //                       payment_method: data.message.payment_data.id,
      //                       "automatic_payment_methods[enabled]": data.message.confirm,
      //                       "automatic_payment_methods[allow_redirects]": data.message.confirm ? "never" : "always",
      //                       description: data.message.description,
      //                     })
      //                     .then((createdStripePaymentIntent: any) => {
      //                       // Pay order
      //                       rabbitmqManager
      //                         .publishMessage(
      //                           "kitecoleExchange",
      //                           "updateOrderPaymentStatus",
      //                           {
      //                             order: data.message.order,
      //                             is_paid: true,
      //                             paid_at: new Date(),
      //                           }
      //                         )
      //                         .then(() => {
      //                           console.log(createdStripePaymentIntent);
      //                         })
      //                         .catch((error) => {
      //                           console.log(error);
      //                         });

      //                       dbConenction.disconnect();
      //                     })
      //                     .catch((err) => {
      //                       console.log(err);
      //                       dbConenction.disconnect();
      //                     });
      //                 })
      //                 .catch((err) => {
      //                   console.log(err);
      //                   dbConenction.disconnect();
      //                 });
      //             } else if(paymentMethod.slug === "paypal") {
      //               paypalOrderService.captureOrder(data.message.payment_data.id);
      //               console.log("Payment method not exist");
      //             }
      //           } else {
      //             console.log("Payment method not exist");
      //           }
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //           dbConenction.disconnect();
      //         });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

      //   channel.ack(msg);
      // });
    } catch (error) {
      console.error("Failed to set up RabbitMQ subscription:", error);
    }
  }

  /**
   * Processes a payment using Stripe by creating a Stripe customer
   * and payment intent, and subsequently triggers updates to the order payment status.
   *
   * @param {any} data - The payment data received from RabbitMQ.
   * @param {any} dbConnection - The active database connection.
   *
   * @throws {Error} If any step in the payment process fails (e.g., creating
   *                 Stripe customer or payment intent).
   * @return {Promise<void>} Resolves when the payment process is completed.
   */
  private async handleStripePayment(
    data: any,
    dbConnection: any
  ): Promise<void> {
    try {
      const paymentMethod: any =
        await paymentMethodService.getPaymentMethodBySlug(
          slugify(data.message.payment_method)
        );
      if (!paymentMethod) {
        console.error("Payment method does not exist.");
        return;
      }

      if (paymentMethod.slug === "stripe") {
        const createdStripeCustomer: any = await stripeCustomerService.store({
          name: data.message.name,
          email: data.message.email,
          phone: data.message.phone,
          payment_method: data.message.payment_data.id,
          user: data.message.user,
        });

        const createdStripePaymentIntent =
          await stripePaymentIntentService.store({
            amount:
              data.message.currency === "USD" ||
              data.message.currency === "EURO"
                ? Math.round(data.message.amount * 100) // Conversion en centimes pour USD/EURO
                : ["JPY", "KRW", "VND"].includes(data.message.currency)
                ? Math.round(data.message.amount) // Pas de conversion pour les devises sans subdivisions
                : Math.round(data.message.amount * 100), // Par défaut, conversion en centimes
            currency: data.message.currency,
            customer: createdStripeCustomer.id,
            confirm: data.message.confirm,
            payment_method: data.message.payment_data.id,
            "automatic_payment_methods[enabled]": data.message.confirm,
            "automatic_payment_methods[allow_redirects]": data.message.confirm
              ? "never"
              : "always",
            description: data.message.description,
          });

        await rabbitmqManager.publishMessage(
          "eluxe.payment.updateOrderPaymentStatus",
          "updateOrderPaymentStatus",
          {
            order: data.message.order,
            is_paid: true,
            paid_at: new Date(),
          }
        );
      } else if (paymentMethod.slug === "paypal") {
        await paypalOrderService.captureOrder(data.message.payment_data.id);
        await rabbitmqManager.publishMessage(
          "eluxe.payment.updateOrderPaymentStatus",
          "updateOrderPaymentStatus",
          {
            order: data.message.order,
            is_paid: true,
            paid_at: new Date(),
          }
        );
      }
    } catch (error) {
      console.error("Error handling Stripe payment:", error);
    } finally {
      dbConnection.disconnect();
    }
  }
}

const paymentSubscribe = new PaymentSubscribe();
export default paymentSubscribe;
