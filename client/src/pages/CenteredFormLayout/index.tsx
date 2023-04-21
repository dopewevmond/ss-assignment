import React, { FC } from "react";
import styles from "./styles.module.css";
import { Heading } from "evergreen-ui";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const CenteredFormLayout: FC<{
  heading: string;
  title: string;
  children: React.ReactNode;
}> = ({ heading, title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
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

          <div className={styles.formContainer}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default CenteredFormLayout;
