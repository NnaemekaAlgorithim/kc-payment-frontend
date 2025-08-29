import React from "react";
import { Form, Field } from "react-final-form";
import UserDashboardLayout from "../../../components/layouts/user-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Button from "@/components/ui/button";

const initialValues = {
  firstName: "",
  lastName: "",
};

export default function AccountSetting() {
  const onSubmit = (values) => {
    console.log(values, "account settings submitted");
    toast.success("Account name updated successfully!");
  };

  const InputField = ({ name, label, placeholder }) => (
    <Field name={name}>
      {({ input, meta }) => (
        <div>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            {...input}
            type="text"
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

  return (
    <UserDashboardLayout>
      <div className="max-w-2xl mt-12 md:mt-20 mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-2 text-primary">
          Account Settings
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Update your first and last name.
        </p>

        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Card */}
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                    />
                    <InputField
                      name="lastName"
                      label="Last Name"
                      placeholder="Doe"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-right">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    </UserDashboardLayout>
  );
}
