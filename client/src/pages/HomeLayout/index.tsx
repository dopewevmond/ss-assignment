import React, { useEffect } from "react";
import {
  CogIcon,
  LabTestIcon,
  PersonIcon,
  TextInputField,
  TimeIcon,
  SelectField,
  Button,
  Spinner,
} from "evergreen-ui";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import { EditProfile } from "../../types";
import { updateProfileSchema } from "../../lib/validators";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getProfileDetails,
  selectEmail,
  selectFirstname,
  selectGender,
  selectLastname,
  selectPhonenumber,
  selectUserId,
  updateProfile as updateProfileThunk,
} from "../../redux/userSlice";
import { Helmet } from "react-helmet";

const links = [
  {
    icon: <PersonIcon size={20} />,
    name: "Personal records",
  },
  {
    icon: <LabTestIcon size={20} />,
    name: "Lab Tests",
  },
  {
    icon: <TimeIcon size={20} />,
    name: "Appointments",
  },
  {
    icon: <CogIcon size={20} />,
    name: "Settings",
  },
];

const HomeLayout = () => {
  const id = useAppSelector(selectUserId);
  const email = useAppSelector(selectEmail);
  const firstname = useAppSelector(selectFirstname);
  const lastname = useAppSelector(selectLastname);
  const phonenumber = useAppSelector(selectPhonenumber);
  const gender = useAppSelector(selectGender);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProfileDetails(id));
    }
  }, [String(id)]);

  const initialFormValues: EditProfile = {
    firstname: firstname ?? "",
    lastname: lastname ?? "",
    phonenumber: phonenumber ?? "",
    email: email ?? "",
    gender: gender ?? "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: updateProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log({ id });
      if (id) {
        await dispatch(updateProfileThunk({ ...values, id }));
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (lastname) {
      formik.setFieldValue("lastname", lastname);
    }
    if (phonenumber) {
      formik.setFieldValue("phonenumber", phonenumber);
    }
    if (gender) {
      formik.setFieldValue("gender", gender);
    }
  }, [lastname, phonenumber, gender]);

  return (
    <div className={styles.rootContainer}>
      <Helmet>
        <title>Self-service customer portal</title>
      </Helmet>
      <Navbar navbarHeading="Self Service Portal" />
      <div className={styles.panelContainer}>
        <div className={styles.rightPanel}>
          <div className={styles.paddingAround}>
            <div className={styles.flexRow}>
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

              {!lastname || !phonenumber || !gender ? (
                <Spinner size={16} marginLeft="0.5rem" />
              ) : null}
            </div>

            <div className={styles.notFullyWide}>
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
                        formik.touched.firstname &&
                        Boolean(formik.errors.firstname)
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
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
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
                      id="phonenumber"
                      name="phonenumber"
                      label="Phone number"
                      value={formik.values.phonenumber}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.phonenumber &&
                        Boolean(formik.errors.phonenumber)
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
                      isInvalid={
                        formik.touched.gender && Boolean(formik.errors.gender)
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
                  type="submit"
                  isLoading={formik.isSubmitting}
                >
                  Update personal information
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.sidebar}>
          {links.map(({ icon, name }, idx) => (
            <button
              key={name}
              className={`${idx === 0 ? styles.activeIconButton : ""} ${
                styles.iconButton
              }`}
            >
              {icon} <span className={styles.sidebarButtonText}>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
