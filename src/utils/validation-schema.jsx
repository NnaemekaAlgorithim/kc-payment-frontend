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
