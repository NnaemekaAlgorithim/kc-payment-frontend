// pages/VerifyAccount.tsx
import { Form, Field } from "react-final-form";
import { z } from "zod";
import { createFormValidate } from "../../utils/validation-schema";
import { useVerifyAccount } from "../../hooks/react-query/useAuth";
import { Link, useLocation } from "react-router-dom";
import verifyIllustration from "/images/reset.svg";
import Button from "@/components/ui/Button";

const verifySchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().min(4, "OTP must be at least 4 digits"),
});

function VerifyAccount() {
  const verifyMutation = useVerifyAccount();
  const location = useLocation();

  const prefilledEmail = location.state?.email || "";
  const onSubmit = (values) => {
    verifyMutation.mutate({ ...values, resend: false });
  };

  const onResend = (values) => {
    verifyMutation.mutate({ ...values, resend: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue-100 items-center justify-center">
        <img
          src={verifyIllustration}
          alt="Verify account illustration"
          className="max-w-md"
        />
      </div>

      {/* Right side - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Verify Your Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the OTP sent to your email to activate your account.
          </p>

          <Form
            onSubmit={onSubmit}
            validate={createFormValidate(verifySchema)}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <Field name="email" initialValue={prefilledEmail}>
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        {...input}
                        type="email"
                        disabled
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {meta.touched && meta.error && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                {/* OTP */}
                <Field name="otp">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        OTP
                      </label>
                      <input
                        {...input}
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {meta.touched && meta.error && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  loading={verifyMutation.isPending}
                  loadingText="Verifying..."
                >
                  Verify Account
                </Button>

                {/* Resend Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => onResend(values)}
                >
                  Resend OTP
                </Button>
              </form>
            )}
          />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already verified?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
