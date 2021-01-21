import React from "react";

type ChiefFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const ChiefForm = ({ initialValues, onSubmit }: ChiefFormProps) => {
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

export default ChiefForm;
