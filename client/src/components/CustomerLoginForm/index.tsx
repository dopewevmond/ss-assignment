import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { TextInputField, Button, Heading } from "evergreen-ui";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/store";
import { CustomerLoginCredentials } from "../../types";
import { customerLoginSchema } from "../../lib/validators";
import { login as loginthunk } from "../../redux/customerSlice";
import { useRedirectOnLoginPages } from "../../shared/hooks";

const initialFormValues: CustomerLoginCredentials = {
  client_number: "",
};

const CustomerLoginForm = () => {
  const dispatch = useAppDispatch();
  useRedirectOnLoginPages();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: customerLoginSchema,
    onSubmit: async ({ client_number }, { setSubmitting }) => {
      console.log({ client_number });
      await dispatch(loginthunk(client_number));
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.parentContainer}>
      <Heading size={700} color="#0E3D85" marginBottom="1rem">
        Log in to your account
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <TextInputField
          id="client_number"
          name="client_number"
          label="Client number"
          value={formik.values.client_number}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.client_number && Boolean(formik.errors.client_number)
          }
          validationMessage={
            formik.touched.client_number && formik.errors.client_number
          }
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

export default CustomerLoginForm;
