import React from "react";

type RouteFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const RouteForm = ({ initialValues, onSubmit }: RouteFormProps) => {
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

export default RouteForm;
