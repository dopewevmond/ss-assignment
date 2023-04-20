import React, { FC } from "react";
import styles from "./styles.module.css";
import { TextInputField, Button, Heading, Text } from "evergreen-ui";
import { loginSchema } from "../../lib/validators";
import { useFormik } from "formik";
import { LoginCredentials } from "../../types";
import { useLogin, useRedirect } from "../../shared/hooks";
import { Link } from "react-router-dom";

const initialFormValues: LoginCredentials = {
  email: "",
  password: "",
};

const LoginForm: FC<{ title: string }> = ({ title }) => {
  useRedirect();
  const { login } = useLogin();
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      login(values, setSubmitting);
    },
  });

  return (
    <div className={styles.parentContainer}>
      <Heading size={700} color="#0E3D85" marginBottom="1rem">
        {title}
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <TextInputField
          id="email"
          name="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          validationMessage={formik.touched.email && formik.errors.email}
        />
        <TextInputField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          validationMessage={formik.touched.password && formik.errors.password}
          type="password"
        />
        <Button
          appearance="primary"
          width="100%"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Log in
        </Button>
      </form>

      <Text display="block" marginTop="1rem">Don&apos;t have an account? <Link to='/signup'>Sign up</Link></Text>
    </div>
  );
};

export default LoginForm;
