"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import Loading from "@/app/components/ui/loading";

export default function PaymentPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("unpaid");
  const [amount, setAmount] = useState<string>("50.00");

  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await fetch("http://127.0.0.1:5000/student/dashboard", {
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            window.location.href = "/login";
            return;
          }
          throw new Error("Failed to load user data");
        }

        const data = await res.json();
        setUser(data.profile);
        setPaymentStatus(data.payment_status);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Failed to load payment information. Please try again.");
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const handleGoCardlessPayment = async () => {
    // TODO: Integrate GoCardless payment flow here
    // This is a placeholder for the GoCardless integration
    alert(
      "GoCardless integration will be implemented here. This will redirect to GoCardless payment flow."
    );

    // Example flow:
    // 1. Create a payment request with GoCardless API
    // 2. Redirect user to GoCardless payment page
    // 3. Handle callback and update payment status in database
  };

  const handleManualPayment = async () => {
    const paymentAmount = parseFloat(amount);
    
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError("Please enter a valid payment amount");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("http://127.0.0.1:5000/payments/submit", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: paymentAmount }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit payment");
      }

      setSuccess(true);
      setPaymentStatus("paid");
      // Reload user data to reflect payment status
      const dashboardRes = await fetch("http://127.0.0.1:5000/student/dashboard", {
        credentials: "include",
      });
      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        setPaymentStatus(dashboardData.payment_status);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="bg-white min-h-screen w-full">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56]">
            Payment
          </h1>
          <p className="text-gray-700 text-md mt-2">
            Complete your payment for {currentMonth}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* PAYMENT STATUS CARD */}
          <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-playfair-display text-[#0F3B56]">
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">
                    Status for {currentMonth}
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border mt-2 ${
                      paymentStatus === "paid"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </div>
                {paymentStatus === "paid" && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Thank you!</p>
                    <p className="text-xs text-gray-500">
                      Payment completed successfully
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SUCCESS MESSAGE */}
          {success && (
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <p className="text-green-800 font-medium">
                      Payment submitted successfully!
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Your payment has been recorded. Thank you!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PAYMENT FORM */}
          {paymentStatus !== "paid" && (
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-playfair-display text-[#0F3B56]">
                  Make Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-700 mb-2 block">
                    Payment Amount (£)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError(null);
                      setSuccess(false);
                    }}
                    className="bg-white border border-[#E5E0D9]"
                    placeholder="50.00"
                    disabled={submitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the amount you wish to pay
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Payment Options:</strong> You can pay via GoCardless
                    (coming soon) or submit a manual payment record. For GoCardless
                    integration, please contact support.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleManualPayment}
                    disabled={submitting || !amount || parseFloat(amount) <= 0}
                    className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Payment"
                    )}
                  </Button>
                  <Button
                    onClick={handleGoCardlessPayment}
                    variant="outline"
                    disabled={submitting}
                    className="border border-[#E5E0D9] disabled:opacity-50"
                  >
                    GoCardless (Coming Soon)
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>
                    By proceeding, you agree to our terms and conditions. For
                    support, please contact us at{" "}
                    <Link
                      href="/contact"
                      className="text-[#5b56a5] underline hover:text-[#7a74cd]"
                    >
                      Contact Us
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* INFO CARD */}
          <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-playfair-display text-[#0F3B56]">
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
                • Payments are processed monthly and are due at the beginning of
                each month
              </p>
              <p>
                • You can pay using GoCardless direct debit for automatic
                payments
              </p>
              <p>
                • If you have any questions about your payment, please contact
                us
              </p>
              <p>
                • Payment confirmation will be sent to your registered email
                address
              </p>
            </CardContent>
          </Card>

          {/* BACK LINK */}
          <div className="text-center">
            <Link
              href="/dashboard/student"
              className="text-[#5b56a5] hover:text-[#7a74cd] underline"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

