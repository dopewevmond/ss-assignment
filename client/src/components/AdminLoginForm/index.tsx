import React, { FC } from "react";
import styles from "./styles.module.css";
import { TextInputField, Button, Heading } from "evergreen-ui";
import { useFormik } from "formik";
import { AdminLoginCredentials } from "../../types";
import { adminLoginSchema } from "../../lib/validators";
import { useRedirectOnLoginPages } from "../../shared/hooks";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/adminSlice";

const initialFormValues: AdminLoginCredentials = {
  email: "",
  password: "",
};

const AdminLoginForm = () => {
  useRedirectOnLoginPages();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: adminLoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await dispatch(login(values));
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.parentContainer}>
      <Heading size={700} color="#0E3D85" marginBottom="1rem">
        Admin Login
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
    </div>
  );
};

export default AdminLoginForm;
