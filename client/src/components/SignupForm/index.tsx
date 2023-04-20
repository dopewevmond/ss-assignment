import React from "react";
import styles from "./styles.module.css";
import {
  TextInputField,
  Button,
  Heading,
  SelectField,
  Text,
} from "evergreen-ui";
import { signupSchema } from "../../lib/validators";
import { useFormik } from "formik";
import { SignupCredentials } from "../../types";
import { useAppDispatch } from "../../redux/store";
import { signup as signupthunk } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { useRedirect } from "../../shared/hooks";

const initialFormValues: SignupCredentials = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  phonenumber: "",
  gender: "",
};

const SignupForm = () => {
  useRedirect();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await dispatch(signupthunk(values));
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.parentContainer}>
      <Heading size={700} color="#0E3D85" marginBottom="1rem">
        Sign up for an account
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.twoColsLargeScreens}>
          <div>
            <TextInputField
              id="firstname"
              name="firstname"
              label="First name"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              validationMessage={
                formik.touched.firstname && formik.errors.firstname
              }
            />
          </div>
          <div>
            <TextInputField
              id="lastname"
              name="lastname"
              label="Last name"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.lastname && Boolean(formik.errors.lastname)
              }
              validationMessage={
                formik.touched.lastname && formik.errors.lastname
              }
            />
          </div>
        </div>
        <TextInputField
          id="email"
          name="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          validationMessage={formik.touched.email && formik.errors.email}
        />

        <div className={styles.fullWidth}>
          <TextInputField
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
            validationMessage={
              formik.touched.password && formik.errors.password
            }
          />
        </div>

        <div className={styles.twoColsLargeScreens}>
          <div className={styles.wider}>
            <TextInputField
              id="phonenumber"
              name="phonenumber"
              label="Phone number"
              value={formik.values.phonenumber}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
              }
              validationMessage={
                formik.touched.phonenumber && formik.errors.phonenumber
              }
            />
          </div>

          <div className={styles.thinner}>
            <SelectField
              id="gender"
              name="gender"
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.gender && Boolean(formik.errors.gender)}
              validationMessage={formik.touched.gender && formik.errors.gender}
              width="100%"
            >
              <option value="">-- Select --</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </SelectField>
          </div>
        </div>

        <Button
          appearance="primary"
          width="100%"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Sign up
        </Button>
      </form>

      <Text display="block" marginTop="1rem">
        Already have an account? <Link to="/login">Log in</Link>
      </Text>
    </div>
  );
};

export default SignupForm;
