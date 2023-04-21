import React, { useEffect, useState } from "react";
import { Spinner } from "evergreen-ui";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import {
  logout,
  refreshEmbedUrl,
  selectEmail,
  selectEmbedUrl,
  selectFirstName,
  selectIsLoggedIn,
} from "../../redux/adminSlice";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
  const [hasIframeLoaded, setIframeLoaded] = useState(false);
  const embedUrl = useAppSelector(selectEmbedUrl);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const email = useAppSelector(selectEmail);
  const firstName = useAppSelector(selectFirstName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (embedUrl) {
      const token = embedUrl.match(/dashboard\/(.*?)#/);
      if (token) {
        try {
          const { exp } = jwt_decode(token[1]) as any;
          const tokenExpiry = new Date(exp * 1000);
          if (tokenExpiry < new Date()) {
            dispatch(refreshEmbedUrl());
          }
        } catch (err) {
          console.log("could not find token for dashboard");
        }
      }
    }
  }, [embedUrl]);

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/admin/login" replace />
      ) : (
        <div>
          <Helmet>
            <title>Admin Dashboard</title>
          </Helmet>

          <div className="flex-column-full-height">
            <Navbar
              navbarHeading="Staff Portal"
              email={String(email)}
              name={String(firstName)}
              logoutFunction={() => dispatch(logout())}
            />

            <div className="flex-fill-space">
              <div className="container full-height padding-around-vertically">
                {!hasIframeLoaded && (
                  <div className={styles.flexRow}>
                    <Spinner size={32} />
                    <p className={styles.sfDisplay}>Loading dashboard...</p>
                  </div>
                )}

                <iframe
                  src={String(embedUrl)}
                  className="iframe-styles"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
