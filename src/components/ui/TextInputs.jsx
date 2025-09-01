import { Form, Field } from "react-final-form";
// ✅ Input Components
export const InputField = ({
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
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none ${
            meta.touched && meta.error
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-blue-500"
          }`}
        />
        {meta.touched && meta.error && (
          <p className="text-sm text-red-500 mt-1">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export const SelectField = ({ name, label, options, fullWidth = false }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div className={fullWidth ? "col-span-2" : ""}>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select
          {...input}
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none ${
            meta.touched && meta.error
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-blue-500"
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {meta.touched && meta.error && (
          <p className="text-sm text-red-500 mt-1">{meta.error}</p>
        )}
      </div>
    )}
  </Field>
);

export const FileField = ({ name, label }) => (
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
