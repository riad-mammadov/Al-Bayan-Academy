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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white border border-[#E5E0D9]"
                    placeholder="50.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the amount you wish to pay
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Secure Payment:</strong> Your payment will be
                    processed securely through GoCardless. You will be redirected
                    to complete the payment.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleGoCardlessPayment}
                    className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] flex-1"
                  >
                    Pay with GoCardless
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/dashboard/student")}
                    className="border border-[#E5E0D9]"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>
                    By proceeding, you agree to our terms and conditions. For
                    support, please contact us at{" "}
                    <Link
                      href="/contact"
                      className="text-[#5b56a5] underline"
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

