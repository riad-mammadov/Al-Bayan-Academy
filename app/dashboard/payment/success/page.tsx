"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Loading from "@/app/components/ui/loading";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const billingRequestId = searchParams.get("billing_request");

    if (!billingRequestId) {
      setError("No payment information found");
      setLoading(false);
      return;
    }

    async function checkPaymentStatus() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/payments/check-status/${billingRequestId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to verify payment status");
        }

        const data = await res.json();

        if (data.ok) {
          setPaymentStatus(data.status);
        } else {
          setError("Failed to verify payment");
        }
      } catch (err: any) {
        console.error("Error checking payment status:", err);
        setError(err.message || "Failed to verify payment");
      } finally {
        setLoading(false);
      }
    }

    checkPaymentStatus();
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-white min-h-screen w-full">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56]">
            Payment {paymentStatus === "paid" ? "Successful" : "Processing"}
          </h1>
          <p className="text-gray-700 text-md mt-2">
            {paymentStatus === "paid"
              ? "Your payment has been confirmed"
              : "Your payment is being processed"}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {error ? (
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-red-300 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-playfair-display text-red-600">
                  Payment Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{error}</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => router.push("/dashboard/payment")}
                    className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/student")}
                    className="border border-[#E5E0D9]"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : paymentStatus === "paid" ? (
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-green-300 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-playfair-display text-green-600">
                  ✓ Payment Successful
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Thank you! Your payment has been processed successfully. You
                  will receive a confirmation email shortly.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    Your account has been updated with the payment information.
                    You can now access all your enrolled classes.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/dashboard/student")}
                  className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
                >
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-blue-300 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-playfair-display text-blue-600">
                  Payment Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your payment is being processed. This may take a few moments.
                  We'll send you a confirmation email once it's complete.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    You can safely close this page. The payment status will be
                    updated in your dashboard shortly.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/dashboard/student")}
                  className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
                >
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}

          {/* INFO CARD */}
          <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-playfair-display text-[#0F3B56]">
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
                If you have any questions about your payment or didn't receive a
                confirmation email, please{" "}
                <Link href="/contact" className="text-[#5b56a5] underline">
                  contact us
                </Link>
                .
              </p>
              <p>
                You can view your payment history and status anytime from your{" "}
                <Link
                  href="/dashboard/student"
                  className="text-[#5b56a5] underline"
                >
                  student dashboard
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}
