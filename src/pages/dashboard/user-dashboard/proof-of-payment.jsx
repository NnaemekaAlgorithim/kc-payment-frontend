import React from "react";
import { Form, Field } from "react-final-form";
import UserDashboardLayout from "../../../components/layouts/user-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { useProofOfPayment } from "../../../hooks/react-query/useTransaction";
const initialValues = {
  amount: "",
  currency: "USD",
  description: "",
  user_payment_method: "",
  user_bank_name: "",
  user_account_name: "",
  user_account_number: "",
  user_payment_reference: "",
  receiver_account_name: "",
  receiver_account_number: "",
  receiver_swift_code: "",
  proof_of_payment: null,
  receiver_qr: null,
};

export default function ProofOfPayment() {
  const proofMutation = useProofOfPayment();

  const onSubmit = (values) => {
    proofMutation.mutate(values);
  };

  const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    fullWidth = false,
  }) => (
    <Field name={name}>
      {({ input, meta }) => (
        <div className={fullWidth ? "col-span-2" : ""}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {meta.touched && meta.error && (
            <p className="text-sm text-red-500 mt-1">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );

  const FileField = ({ name, label }) => (
    <Field name={name}>
      {({ input }) => (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => input.onChange(e.target.files[0])}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
      )}
    </Field>
  );

  return (
    <UserDashboardLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8 md:mt-10">
        <h2 className="text-2xl font-bold mb-2 text-primary">
          Proof of Payment
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Fill in your details or upload proof of payment image.
        </p>

        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* User Payment Card */}
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">
                    User Payment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      name="amount"
                      label="Amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                    <InputField
                      name="currency"
                      label="Currency"
                      placeholder="USD"
                    />
                    <InputField
                      name="user_payment_method"
                      label="Payment Method"
                      placeholder="Bank Transfer"
                    />
                    <InputField
                      name="user_payment_reference"
                      label="Payment Reference"
                      placeholder="TXN123456789"
                    />
                    <InputField
                      name="user_bank_name"
                      label="Bank Name"
                      placeholder="Chase Bank"
                    />
                    <InputField
                      name="user_account_name"
                      label="Account Name"
                      placeholder="John Doe"
                    />
                    <InputField
                      name="user_account_number"
                      label="Account Number"
                      placeholder="1234567890"
                    />
                  </div>
                  <FileField
                    name="proof_of_payment"
                    label="Upload Proof of Payment (optional)"
                  />
                </CardContent>
              </Card>

              {/* Receiver Details Card */}
              <Card className="rounded-2xl shadow-md">
                <CardContent className=" md:p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-green-600">
                    Receiver Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      name="receiver_account_name"
                      label="Receiver Account Name"
                      placeholder="Jane Smith Business"
                      fullWidth={true} // single column on mobile, half on sm+
                    />
                    <InputField
                      name="receiver_account_number"
                      label="Receiver Account Number"
                      placeholder="9876543210"
                      fullWidth={true}
                    />
                    <InputField
                      name="receiver_swift_code"
                      label="Receiver SWIFT Code"
                      placeholder="CHASUS33XXX"
                      fullWidth={true} // spans both columns
                    />
                    <FileField
                      name="receiver_qr"
                      label="Upload Receiver’s QR / Bank Image (optional)"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="">
                <Button
                  className="w-full"
                  loading={proofMutation.isPending}
                  type="submit"
                >
                  Submit Proof of Payment
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    </UserDashboardLayout>
  );
}
