import paymentSubscribe from "../modules/payment-subscribe/payment.subscribe";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-27
 *
 * Class Subscribes
 */
class Subscribes {

  /**
   * Creating app Subscribes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-27
   *
   * @returns {void}
   */
  public appSubscribes(): void {
    // Includes all subscribes
    paymentSubscribe.confirmPayment();
  }

  /**
   * Load subscribes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-27
   *
   * @returns {void}
   */
  public subscribesConfig(): void {
    this.appSubscribes();
  }
}

export default Subscribes;
