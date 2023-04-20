import React, { FC } from "react";
import styles from "./styles.module.css";
import { Heading } from "evergreen-ui";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const LoginPage: FC<{ heading: string }> = ({ heading }) => {
  return (
    <>
    <Helmet>
      <title>Customer Portal - Sign up or log in</title>
    </Helmet>
    <div className={styles.rootElement}>
      <div className={styles.parentContainer}>
        <Heading
          size={800}
          marginBottom="1rem"
          color="#0E3D85"
          textAlign="center"
        >
          {heading}
        </Heading>

        <div className={styles.formContainer}>
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
