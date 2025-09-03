import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "react-final-form";
import { InputField, SelectField } from "../ui/TextInputs";
import { Button } from "../ui/Button";
import { useUpdateTransaction } from "../../hooks/react-query/useTransaction";

const currencyOptions = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "NGN", label: "NGN — Nigerian Naira" },
  { value: "CNY", label: "CNY — Chinese Yuan" },
];

const paymentMethodOptions = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "card", label: "Card" },
  { value: "ussd", label: "USSD" },
];

function EditTransactionModal({ open, onClose, transaction }) {
  const updateMutation = useUpdateTransaction();

  const canEdit = (transaction?.status || "").toLowerCase() === "pending";

  const initialValues = {
    // money
    amount: transaction?.amount ?? "",
    currency: transaction?.currency ?? "USD",

    // user section
    user_payment_method: transaction?.user_payment_method ?? "",
    user_bank_name: transaction?.user_bank_name ?? "",
    user_account_name: transaction?.user_account_name ?? "",
    user_account_number: transaction?.user_account_number ?? "",
    user_payment_reference: transaction?.user_payment_reference ?? "",

    // receiver section
    receiver_account_name: transaction?.receiver_account_name ?? "",
    receiver_account_number: transaction?.receiver_account_number ?? "",
    receiver_bank_name: transaction?.receiver_bank_name ?? "", // may be absent in response
    receiver_swift_code: transaction?.receiver_swift_code ?? "",
    // images/urls intentionally skipped unless you decide to add file inputs
  };

  const handleSubmit = (values) => {
    if (!canEdit) return;
    updateMutation.mutate(
      { id: transaction.id, data: values },
      { onSuccess: onClose }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        {!canEdit ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              This transaction can’t be edited because its status is{" "}
              <span className="font-semibold">
                {transaction?.status_display || transaction?.status}
              </span>
              .
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Amount & Currency */}
                <InputField
                  name="amount"
                  label="Amount"
                  type="number"
                  placeholder="Enter amount"
                />
                <SelectField
                  name="currency"
                  label="Currency"
                  options={currencyOptions}
                />

                {/* User Payment */}
                <SelectField
                  name="user_payment_method"
                  label="Payment Method"
                  options={paymentMethodOptions}
                />
                <InputField
                  name="user_payment_reference"
                  label="Payment Reference"
                  placeholder="TXN-REF"
                />

                <InputField
                  name="user_bank_name"
                  label="User Bank Name"
                  placeholder="e.g., Chase Bank"
                />
                {/* Receiver */}
                <InputField
                  name="receiver_account_name"
                  label="Receiver Account Name"
                  placeholder="Jane Smith Business"
                />
                <InputField
                  name="receiver_account_number"
                  label="Receiver Account Number"
                  placeholder="9876543210"
                />
                <InputField
                  name="receiver_swift_code"
                  label="Receiver SWIFT Code"
                  placeholder="UNAFNGLAXXX"
                />

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <Button variant="outline" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" loading={updateMutation.isPending}>
                    {updateMutation.isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionModal;
