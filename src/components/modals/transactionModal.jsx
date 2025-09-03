import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUpdateAdminTransaction } from "../../hooks/react-query/useTransaction";

export default function TransactionModal({
  open,
  onClose,
  fullDetails,
  isDetailsLoading,
}) {
  const [modalStep, setModalStep] = useState("details"); // "details" | "payment"
  const [paymentDocs, setPaymentDocs] = useState({
    transactionCompletionDoc: null,
    additionalDoc: null,
    notes: "",
    status: "pending",
  });

  const resetPaymentState = () => {
    setModalStep("details");
    setPaymentDocs({
      transactionCompletionDoc: null,
      additionalDoc: null,
      notes: "",
      status: "pending",
    });
  };

  const handleClose = () => {
    resetPaymentState();
    onClose();
  };
  const onSubmitPayment = (docs, reset) => {
    const formData = new FormData();
    if (docs.transactionCompletionDoc) {
      formData.append(
        "transactionCompletionDoc",
        docs.transactionCompletionDoc
      );
    }
    if (docs.additionalDoc) {
      formData.append("additionalDoc", docs.additionalDoc);
    }
    formData.append("notes", docs.notes || "");
    formData.append("status", docs.status);

    updateTransaction(
      { id: fullDetails.id, data: formData },
      {
        onSuccess: () => {
          reset(); // reset modal state
          handleClose(); // close dialog
        },
        onError: (err) => {
          console.error("Payment submission failed", err);
        },
      }
    );
  };

  const { mutate: updateTransaction, isPending: isUpdatingTransaction } =
    useUpdateAdminTransaction();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" rounded-2xl shadow-xl p-6 bg-white">
        {modalStep === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Transaction Details
              </DialogTitle>
              <DialogDescription className="text-gray-500 mt-1">
                Review full transaction details.
              </DialogDescription>
            </DialogHeader>

            {isDetailsLoading ? (
              <p className="text-center text-gray-500">Loading details...</p>
            ) : fullDetails ? (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>ID:</strong> {fullDetails.id}
                  </p>
                  <p>
                    <strong>Status:</strong> {fullDetails.status_display}
                  </p>
                  <p>
                    <strong>Amount:</strong>{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: fullDetails.currency || "USD",
                    }).format(fullDetails.amount)}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(fullDetails.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Reference #:</strong> {fullDetails.reference_number}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Receiver Details</h4>
                  <p>
                    <strong>Name:</strong> {fullDetails.receiver_account_name}
                  </p>
                  <p>
                    <strong>Account No:</strong>{" "}
                    {fullDetails.receiver_account_number}
                  </p>
                  <p>
                    <strong>Swift Code:</strong>{" "}
                    {fullDetails.receiver_swift_code}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">User Details</h4>
                  <p>
                    <strong>Full Name:</strong> {fullDetails.user_full_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {fullDetails.user_email}
                  </p>
                  <p>
                    <strong>Bank:</strong> {fullDetails.user_bank_name}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {fullDetails.user_payment_method}
                  </p>
                  <p>
                    <strong>Payment Reference:</strong>{" "}
                    {fullDetails.user_payment_reference}
                  </p>
                  <p>
                    <strong>Account Name:</strong>{" "}
                    {fullDetails.user_account_name}
                  </p>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {fullDetails.user_account_number}
                  </p>
                </div>

                {fullDetails.notes && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p>{fullDetails.notes}</p>
                  </div>
                )}

                {["pending", "processing"].includes(
                  fullDetails.status?.toLowerCase()
                ) && (
                  <div className="text-right mt-6">
                    {["pending", "processing"].includes(
                      fullDetails.status?.toLowerCase()
                    ) && (
                      <div className="text-right mt-6">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={isUpdatingTransaction}
                          onClick={() => {
                            setModalStep("payment");
                            // const formData = new FormData();
                            // formData.append("status", "processing");

                            // updateTransaction(
                            //   { id: fullDetails.id, data: formData },
                            //   {
                            //     onSuccess: () => {

                            //     },
                            //     onError: () => {
                            //       console.error(
                            //         "Failed to update transaction status"
                            //       );
                            //     },
                            //   }
                            // );
                          }}
                        >
                          {isUpdatingTransaction
                            ? "Processing..."
                            : "Make Payment"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-500 text-center">
                Failed to load transaction
              </p>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Upload Payment Proof
              </DialogTitle>
              <DialogDescription className="text-gray-500 mt-1">
                Attach documents, select status, and add notes before
                submitting.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  Completion Document
                </label>
                <input
                  type="file"
                  className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={(e) =>
                    setPaymentDocs((prev) => ({
                      ...prev,
                      transactionCompletionDoc: e.target.files[0],
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  Additional Document
                </label>
                <input
                  type="file"
                  className="block w-full text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={(e) =>
                    setPaymentDocs((prev) => ({
                      ...prev,
                      additionalDoc: e.target.files[0],
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none placeholder-gray-400"
                  placeholder="Add notes about this payment..."
                  value={paymentDocs.notes}
                  onChange={(e) =>
                    setPaymentDocs((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingTransaction}
                  onClick={() => {
                    const formData = new FormData();
                    if (paymentDocs.transactionCompletionDoc) {
                      formData.append(
                        "transactionCompletionDoc",
                        paymentDocs.transactionCompletionDoc
                      );
                    }
                    if (paymentDocs.additionalDoc) {
                      formData.append(
                        "additionalDoc",
                        paymentDocs.additionalDoc
                      );
                    }
                    formData.append("notes", paymentDocs.notes);
                    formData.append("status", "completed"); // ✅ complete payment

                    updateTransaction(
                      { id: fullDetails.id, data: formData },
                      {
                        onSuccess: () => {
                          resetPaymentState();
                          handleClose(); // close modal if you want
                        },
                      }
                    );
                  }}
                >
                  {isUpdatingTransaction ? "Processing..." : "Complete Payment"}
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingTransaction}
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("notes", paymentDocs.notes);
                    formData.append("status", "cancelled"); // ❌ cancel payment

                    updateTransaction(
                      { id: fullDetails.id, data: formData },
                      {
                        onSuccess: () => {
                          resetPaymentState();
                          handleClose(); // close modal if you want
                        },
                      }
                    );
                  }}
                >
                  {isUpdatingTransaction ? "Processing..." : "Cancel Payment"}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
