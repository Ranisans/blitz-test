import React from "react";

type CompanyFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const CompanyForm = ({ initialValues, onSubmit }: CompanyFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <div>{JSON.stringify(initialValues)}</div>
      <button type="button">Submit</button>
    </form>
  );
};

export default CompanyForm;
