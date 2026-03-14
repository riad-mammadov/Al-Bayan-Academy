import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <section className="bg-white min-h-screen w-full">
      <section className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56]">
            Payments Moved Outside the App
          </h1>
          <p className="text-gray-700 text-md mt-2">
            Please use the external payment portal for all payment actions.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-playfair-display text-[#0F3B56]">
                External Payment Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="https://example.com/payments"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]">
                  Open External Payment Portal
                </Button>
              </Link>
              <Link href="/dashboard/student">
                <Button variant="outline">Back to Student Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}
