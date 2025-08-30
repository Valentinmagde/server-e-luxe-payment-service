import { slugify } from "../../utils/helpers.util";
import DBManager from "../../../core/db";
import rabbitmqManager from "../../../core/rabbitmq";
import paymentMethodService from "../payment-method/payment-method.service";
import paypalOrderService from "../paypal/paypal-order/paypal-order.service";
import stripeCustomerService from "../stripe/stripe-customer/stripe-customer.service";
import stripePaymentIntentService from "../stripe/stripe-payment-intent/stripe-payment-intent.service";
import airwallexPaymentIntentService from "../airwallex/airwallex-payment-intent/airwallex-payment-intent.service";

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

          // Process payment
          await this.handlePayment(data, dbConnection);
        } catch (error) {
          console.error("Message processing failed:", error);
        } finally {
          channel.ack(msg); // Always acknowledge the message
        }
      });
    } catch (error) {
      console.error("Failed to set up RabbitMQ subscription:", error);
    }
  }

  /**
   * Processes a payment using Stripe, Paypal, or Airwallex by creating a Stripe, Paypal, or Airwallex customer
   * and payment intent, and subsequently triggers updates to the order payment status.
   *
   * @param {any} data - The payment data received from RabbitMQ.
   * @param {any} dbConnection - The active database connection.
   *
   * @throws {Error} If any step in the payment process fails (e.g., creating
   *                 Stripe, Paypal, or Airwallex customer or payment intent).
   * @return {Promise<void>} Resolves when the payment process is completed.
   */
  private async handlePayment(data: any, dbConnection: any): Promise<void> {
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
        await this.handleStripePayment(data);
      } else if (paymentMethod.slug === "paypal") {
        await this.handlePaypalPayment(data);
      } else if (paymentMethod.slug === "airwallex") {
        await this.handleAirwallexPayment(data);
      } else {
        await rabbitmqManager.publishMessage(
          "eluxe.payment.updateOrderPaymentStatus",
          "updateOrderPaymentStatus",
          {
            order: data.message.order,
            is_paid: false,
            paid_at: null,
          }
        );
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      dbConnection.disconnect();
    }
  }

  /**
   * Processes a payment using Airwallex by creating an Airwallex customer
   * and payment intent, and subsequently triggers updates to the order payment status.
   *
   * @param {any} data - The payment data received from RabbitMQ.
   *
   * @throws {Error} If any step in the payment process fails (e.g., creating
   *                 Airwallex customer or payment intent).
   * @return {Promise<void>} Resolves when the payment process is completed.
   */
  private async handleAirwallexPayment(data: any): Promise<void> {
    try {
      const paymentIntent: any =
        await airwallexPaymentIntentService.getAirwallexPaymentIntentById(
          data?.message?.payment_data?.intent_id
        );

      if (!paymentIntent) {
        console.error("Payment intent does not exist.");
        return;
      }

      if (
        paymentIntent.status === "SUCCEEDED" ||
        paymentIntent.status === "REQUIRES_CAPTURE" ||
        paymentIntent.status === "AUTHORIZED"
      ) {
        const paymentCaptured = await airwallexPaymentIntentService.captureAirwallexPaymentIntent(
          data?.message?.payment_data?.intent_id,
          {
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            request_id: data?.message?.payment_data?.request_id,
          }
        );

        await rabbitmqManager.publishMessage(
        "eluxe.payment.updateOrderPaymentStatus",
        "updateOrderPaymentStatus",
        {
          order: data.message.order,
          is_paid: true,
          paid_at: new Date(),
        }
      );
      } else {
        await airwallexPaymentIntentService.confirmAirwallexPaymentIntent(
          data?.message?.payment_data?.intent_id,
          data?.message?.payment_data
        );
      }
    } catch (error) {
      console.error("Error handling Airwallex payment:", error);
    }
  }

  /**
   * Processes a payment using Stripe by creating a Stripe customer
   * and payment intent, and subsequently triggers updates to the order payment status.
   *
   * @param {any} data - The payment data received from RabbitMQ.
   *
   * @throws {Error} If any step in the payment process fails (e.g., creating
   *                 Stripe customer or payment intent).
   * @return {Promise<void>} Resolves when the payment process is completed.
   */
  private async handleStripePayment(data: any): Promise<void> {
    const createdStripeCustomer: any = await stripeCustomerService.store({
      name: data.message.name,
      email: data.message.email,
      phone: data.message.phone,
      payment_method: data.message.payment_data.id,
      user: data.message.user,
    });

    await stripePaymentIntentService.store({
      amount:
        data.message.currency === "USD" || data.message.currency === "EURO"
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
  }

  /**
   * Processes a payment using Paypal by capturing the order
   * and subsequently triggers updates to the order payment status.
   *
   * @param {any} data - The payment data received from RabbitMQ.
   *
   * @throws {Error} If any step in the payment process fails (e.g., capturing
   *                 the Paypal order).
   * @return {Promise<void>} Resolves when the payment process is completed.
   */
  private async handlePaypalPayment(data: any): Promise<void> {
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
}

const paymentSubscribe = new PaymentSubscribe();
export default paymentSubscribe;
