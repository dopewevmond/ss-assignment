import React from "react";
import { TextInputField, SelectField, Button } from "evergreen-ui";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import { EditProfile } from "../../types";
import { updateProfileSchema } from "../../lib/validators";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Helmet } from "react-helmet";
import {
  logout,
  selectClientName,
  selectClientNumber,
  selectEmail,
  selectGender,
  selectIsLoggedIn,
  selectMobile,
  updateProfile,
} from "../../redux/customerSlice";
import { Navigate } from "react-router-dom";

const HomeLayout = () => {
  const email = useAppSelector(selectEmail);
  const client_name = useAppSelector(selectClientName);
  const mobile = useAppSelector(selectMobile);
  const gender = useAppSelector(selectGender);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const client_number = useAppSelector(selectClientNumber)

  const dispatch = useAppDispatch();

  const initialFormValues: EditProfile = {
    client_name: client_name ?? "",
    mobile: mobile ?? "",
    email: email ?? "",
    gender: gender ?? "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: updateProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (client_number == null) {
        setSubmitting(false);
        return;
      }
      await dispatch(updateProfile({ ...values, client_number }))
      setSubmitting(false);
    },
  });

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="login" replace={true} />
      ) : (
        <>
          <Helmet>
            <title>Self-service customer portal</title>
          </Helmet>

          <div className="flex-column-full-height">
            <Navbar
              navbarHeading="Self Service Portal"
              name={String(client_name)}
              email={String(email)}
              logoutFunction={() => dispatch(logout())}
            />

            <div className="flex-fill-space">
              <div className="container full-height-padding-around-vertically padding-around-horizontally">
                <h2
                  style={{
                    color: "#0E3D85",
                    marginBottom: "1rem",
                    fontSize: "18px",
                    fontWeight: 600,
                    fontFamily: "SF UI Display, sans-serif",
                  }}
                >
                  Personal records
                </h2>

                <div className={styles.notFullyWide}>
                  <form onSubmit={formik.handleSubmit}>
                    <TextInputField
                      id="client_name"
                      name="client_name"
                      label="Your name"
                      value={formik.values.client_name}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.client_name &&
                        Boolean(formik.errors.client_name)
                      }
                      validationMessage={
                        formik.touched.client_name && formik.errors.client_name
                      }
                    />

                    <TextInputField
                      id="email"
                      name="email"
                      label="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      validationMessage={
                        formik.touched.email && formik.errors.email
                      }
                    />

                    <div className={styles.twoColsLargeScreens}>
                      <div className={styles.wider}>
                        <TextInputField
                          id="mobile"
                          name="mobile"
                          label="Phone number"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.mobile &&
                            Boolean(formik.errors.mobile)
                          }
                          validationMessage={
                            formik.touched.mobile && formik.errors.mobile
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
                          isInvalid={
                            formik.touched.gender &&
                            Boolean(formik.errors.gender)
                          }
                          validationMessage={
                            formik.touched.gender && formik.errors.gender
                          }
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
                      intent="success"
                      type="submit"
                      isLoading={formik.isSubmitting}
                    >
                      Update personal information
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeLayout;
