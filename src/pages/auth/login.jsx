import { Form, Field } from "react-final-form";
import { useNavigate, Link } from "react-router-dom";
import { validate } from "../../utils/validation-schema";
import loginIllustration from "/images/login.svg";
import Button from "../../components/ui/Button";
import { loginSchema } from "../../utils/schemas";
import { useLogin } from "../../hooks/react-query/useAuth";
import { toast } from "sonner";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  function onSubmit(values) {
    login(values, {
      onSuccess: (response) => {
        console.log(response, "login response");
        if (response?.success) {
          toast.success("Login successful!");

          const user = response.data.user;

          if (user.is_staff) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard/");
          }
        } else {
          toast.error(response?.message || "Login failed. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);

        const backend = error?.response?.data;

        const backendMessage =
          backend?.response_data?.errors?.non_field_errors?.[0] ||
          backend?.response_data?.message ||
          "Login failed. Please try again.";

        toast.error(backendMessage);
      },
    });
  }
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center px-10 text-white bg-gradient-to-br to-blue-500 from-purple-500">
        <div className="w-[80%]">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full drop-shadow-2xl"
          />
          <h1 className="mt-8 text-4xl font-bold leading-tight text-center">
            Send money across borders <br /> with ease
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
            Welcome Back!
          </h2>
          <p className="text-sm text-muted mb-8">
            Enter your details to log in
          </p>

          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={(values) => validate(loginSchema, values)}
            render={({ handleSubmit, submitting }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* email */}
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        {...input}
                        type="text"
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

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/request-reset"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  loading={isPending}
                  loadingText="Signing in..."
                >
                  Log In
                </Button>
              </form>
            )}
          />

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
