import React, { ReactNode, PropsWithoutRef } from "react";
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form";
import * as z from "zod";

export { FORM_ERROR } from "final-form";

type FormProps<S extends z.ZodType<any, any>> = {
  /** All your form fields */
  children: ReactNode;
  /** Text to display in the submit button */
  submitText: string;
  schema?: S;
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"];
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"];
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">;

type S = z.ZodType<any, any>;

type TForm = ({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) => JSX.Element;

export const Form: TForm = ({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) => {
  const validate = (values: z.TypeOf<S>) => {
    if (!schema) return true;
    try {
      schema.parse(values);
      return true;
    } catch (error) {
      return error.formErrors.fieldErrors;
    }
  };

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          <button type="submit" disabled={submitting}>
            {submitText}
          </button>

          <style global jsx>
            {`
              .form > * + * {
                margin-top: 1rem;
              }
            `}
          </style>
        </form>
      )}
    />
  );
};