// pages/ForgotPassword.tsx
import { Form, Field } from "react-final-form";
import { useForgotPassword } from "../../hooks/react-query/useAuth";
import { z } from "zod";
import { createFormValidate } from "../../utils/validation-schema";
import { useNavigate, Link } from "react-router-dom";
import loginIllustration from "/images/request.svg";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const forgotMutation = useForgotPassword(navigate);
  const onSubmit = async (values) => {
    forgotMutation.mutate(values, {
      onSuccess: (res) => {
        toast.success(res?.message || "OTP sent successfully!");
        navigate("/reset-password", { state: { email: values.email } });
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
          src={loginIllustration}
          alt="Forgot password illustration"
          className="max-w-md"
        />
      </div>

      {/* Right side - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your email and we’ll send you an OTP to reset your password.
          </p>

          <Form
            onSubmit={onSubmit}
            validate={createFormValidate(forgotSchema)}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        {...input}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="w-full ">
                  <Button
                    type="submit"
                    className={"w-full"}
                    loading={forgotMutation.isPending}
                    loadingText="Signing in..."
                  >
                    Send OTP
                  </Button>
                </div>
              </form>
            )}
          />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
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

export default ForgotPassword;
