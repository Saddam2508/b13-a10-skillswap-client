// src/app/api/create-checkout-session/route.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { amount, taskId, proposalId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "SkillSwap Task Payment" },
            unit_amount: Math.round(Number(amount) * 100), // dollar → cents
          },
          quantity: 1,
        },
      ],
      mode: "payment", // ✅ one-time, subscription না
      success_url: `${origin}/payment/success?taskId=${taskId}&proposalId=${proposalId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}