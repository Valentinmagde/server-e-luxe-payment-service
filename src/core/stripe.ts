import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2023-10-16",
});

export const stripe_pk = new Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`, {
  apiVersion: "2023-10-16",
});
