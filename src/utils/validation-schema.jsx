import { setIn } from "final-form";

export function segmentsToPath(segments) {
  return segments.reduce((path, segment) => {
    if (typeof segment === "number") {
      return `${path}[${segment}]`;
    }
    if (segment === "id") {
      return path;
    }
    return path ? `${path}.${segment}` : segment;
  }, "");
}

export function validate(zodSchema, values) {
  const zodResult = zodSchema.safeParse(values);

  if (zodResult.success) {
    return undefined;
  }

  const allFormErrors = zodResult.error.issues.reduce((formErrors, error) => {
    const errorPath = segmentsToPath(error.path);
    return setIn(formErrors, errorPath, error.message);
  }, {});

  return allFormErrors;
}

export function createFormValidate(zodSchema) {
  return (values) => validate(zodSchema, values);
}

export const CreateTransactionvalidate = (values) => {
  const errors = {};

  // Amount
  if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
    errors.amount = "Enter a valid amount greater than 0";
  }

  // Currency
  if (!values.currency) {
    errors.currency = "Currency is required";
  }

  // Payment Method
  if (!values.user_payment_method) {
    errors.user_payment_method = "Payment method is required";
  }

  // ✅ USER PAYMENT: either reference/details OR proof_of_payment
  const userInputsProvided =
    values.user_payment_reference &&
    values.user_bank_name &&
    values.user_account_name &&
    values.user_account_number;

  if (!userInputsProvided && !values.proof_of_payment) {
    errors.proof_of_payment =
      "Either upload proof of payment OR fill in all user payment details";
    errors.user_payment_reference =
      "Provide payment reference if not uploading proof";
  }

  // Validate account number format if entered
  if (
    values.user_account_number &&
    !/^\d{6,20}$/.test(values.user_account_number)
  ) {
    errors.user_account_number = "Enter a valid account number (6–20 digits)";
  }

  // ✅ RECEIVER DETAILS: either inputs OR receiver_qr
  const receiverInputsProvided =
    values.receiver_account_name &&
    values.receiver_account_number &&
    values.receiver_swift_code;

  if (!receiverInputsProvided && !values.receiver_qr) {
    errors.receiver_qr =
      "Either upload receiver’s QR/bank image OR fill in all receiver details";
    errors.receiver_account_name =
      "Provide receiver details if not uploading QR";
  }

  if (
    values.receiver_account_number &&
    !/^\d{6,20}$/.test(values.receiver_account_number)
  ) {
    errors.receiver_account_number = "Enter a valid receiver account number";
  }

  if (
    values.receiver_swift_code &&
    !/^[A-Za-z0-9]{8,11}$/.test(values.receiver_swift_code)
  ) {
    errors.receiver_swift_code = "Enter a valid SWIFT code";
  }

  return errors;
};