import { Form, Field } from "react-final-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { validate } from "../../utils/validation-schema";
import { registerSchema } from "../../utils/schemas";
import registerIllustration from "/images/register.svg";
import Button from "../../components/ui/Button";
import { useRegister } from "../../hooks/react-query/useAuth";
import { toast } from "sonner";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function Register() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  function onSubmit(values) {
    console.log(values, "register form data");

    register(values, {
      onSuccess: (response) => {
        console.log(response, "register response");

        if (response?.success) {
          toast.success("Account created successfully!");
          navigate("/activate-account", { state: { email: values.email } });
        } else {
          toast.error(
            response?.message || "Registration failed. Please try again."
          );
        }
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
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center px-10 text-white bg-gradient-to-br from-blue-500 to-purple-500">
        <div className="w-[80%]">
          <img
            src={registerIllustration}
            alt="Register Illustration"
            className="w-full drop-shadow-2xl"
          />
          <h1 className="mt-8 text-4xl font-bold leading-tight text-center">
            Create your account <br /> and start sending
          </h1>
          <p className="mt-4 text-lg text-blue-100 text-center">
            Fast, secure, and simple payments across borders
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Create Account
          </h2>
          <p className="text-sm text-muted mb-8">
            Fill in your details to get started
          </p>

          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={(values) => validate(registerSchema, values)}
            render={({ handleSubmit, submitting }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* First Name */}
                <Field name="first_name">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  )}
                </Field>

                {/* Last Name */}
                <Field name="last_name">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  )}
                </Field>

                {/* Email */}
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        {...input}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  )}
                </Field>

                {/* Password */}
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        {...input}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {meta.error}
                        </p>
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
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {meta.touched && meta.error && (
                        <p className="text-sm text-red-600 mt-1">
                          {meta.error}
                        </p>
                      )}
                    </div>
                  )}
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  loading={isPending}
                  loadingText="Creating account..."
                >
                  Sign Up
                </Button>
              </form>
            )}
          />

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
