import React from "react";
import { useMutation } from "blitz";
import { LabeledTextField } from "app/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/components/Form";
import signup from "app/auth/mutations/signup";
import { SignupInput } from "app/auth/validations";

interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  const onSubmit = async (values: any) => {
    try {
      await signupMutation(values);
      onSuccess?.();
      return true;
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" };
      }
      return { [FORM_ERROR]: error.toString() };
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  );
};

export default SignupForm;
