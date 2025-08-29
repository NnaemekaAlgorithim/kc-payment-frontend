// pages/ResetPassword.tsx
import { Form, Field } from "react-final-form";
import { z } from "zod";
import { createFormValidate } from "../../utils/validation-schema";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useResetPassword } from "../../hooks/react-query/useAuth";
import resetIllustration from "/images/reset.svg";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

const resetSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    otp: z.string().min(4, "OTP must be at least 4 digits"),
    new_password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

function ResetPassword() {
  const navigate = useNavigate();
  const resetMutation = useResetPassword(navigate);
  const location = useLocation();

  const prefilledEmail = location.state?.email || "";
  const onSubmit = async (values) => {
    resetMutation.mutate(values, {
      onSuccess: (res) => {
        toast.success(res?.message || "Password successfully!");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Login failed:", error);

        const backend = error?.response?.data;

        const backendMessage =
          backend?.response_data?.errors?.email?.[0] ||
          backend?.response_data?.message ||
          "Login failed. Please try again.";

        toast.error(backendMessage);
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue-100 items-center justify-center">
        <img
          src={resetIllustration}
          alt="Reset password illustration"
          className="max-w-md"
        />
      </div>

      {/* Right side - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the OTP we sent to your email, then choose a new password.
          </p>

          <Form
            onSubmit={onSubmit}
            validate={createFormValidate(resetSchema)}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <Field name="email" initialValue={prefilledEmail}>
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        {...input}
                        type="email"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-100"
                      />
                      {meta.touched && meta.error && (
                        <span className="text-red-500 text-xs">
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
                        <span className="text-red-500 text-xs">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                {/* New Password */}
                <Field name="new_password">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        {...input}
                        type="password"
                        placeholder="********"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {meta.touched && meta.error && (
                        <span className="text-red-500 text-xs">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                {/* Confirm Password */}
                <Field name="confirm_password">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        {...input}
                        type="password"
                        placeholder="********"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {meta.touched && meta.error && (
                        <span className="text-red-500 text-xs">
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  loading={resetMutation.isPending}
                  loadingText="Resetting..."
                >
                  Reset Password
                </Button>
              </form>
            )}
          />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Back to{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
