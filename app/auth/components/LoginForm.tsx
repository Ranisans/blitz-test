import React from "react";
import { AuthenticationError, useMutation } from "blitz";

import { Form, FORM_ERROR } from "app/components/Form";
import login from "app/auth/mutations/login";
import { LoginInput } from "app/auth/validations";
import { Container, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LightTextField from "../../components/LightTextField";

type LoginFormProps = {
  onSuccess?: () => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10vh",
    height: "100vh",
  },
  titleBlock: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    color: "#9D9C9C",
  },
  form: {
    maxWidth: 500,
    margin: theme.spacing(1, "auto", 0, "auto"),
  },
}));

export const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);
  const styles = useStyles();

  return (
    <Container component="main" className={styles.container}>
      <div className={styles.titleBlock}>
        <Typography component="h1" variant="h5" className={styles.title}>
          Введите учетные данные
        </Typography>
      </div>
      <div className={styles.form}>
        <Form
          submitText="Login"
          schema={LoginInput}
          initialValues={{ login: "", password: "" }}
          /* eslint-disable-next-line consistent-return */
          onSubmit={async (values) => {
            try {
              await loginMutation(values);
              props.onSuccess?.();
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
              }
              return {
                [FORM_ERROR]: `Sorry, we had an unexpected error. Please try again. - ${error.toString()}`,
              };
            }
          }}
        >
          <LightTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="on"
            autoFocus
          />
          <LightTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Пароль"
            autoComplete="current-password"
          />
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
