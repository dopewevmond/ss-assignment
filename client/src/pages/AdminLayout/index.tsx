import React, { useEffect, useState } from "react";
import { ChartIcon, CogIcon, DocumentIcon, Spinner } from "evergreen-ui";
import styles from "./styles.module.css";
import Navbar from "../../components/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { refreshEmbedUrl, selectEmbedUrl } from "../../redux/userSlice";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";

const AdminLayout = () => {
  const [hasIframeLoaded, setIframeLoaded] = useState(false);
  const links = [
    {
      icon: <ChartIcon size={20} />,
      name: "Dashboard",
    },
    {
      icon: <DocumentIcon size={20} />,
      name: "Reports",
    },
    {
      icon: <CogIcon size={20} />,
      name: "Settings",
    },
  ];

  const embedUrl = useAppSelector(selectEmbedUrl);
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
    <div className={styles.rootContainer}>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Navbar navbarHeading="Staff Portal" />
      <div className={styles.panelContainer}>
        <div className={styles.rightPanel}>
          {!hasIframeLoaded && (
            <div className={styles.flexRow}>
              <Spinner size={32} />
              <p className={styles.sfDisplay}>Loading dashboard...</p>
            </div>
          )}
          <iframe
            src={String(embedUrl)}
            width="100%"
            height="100%"
            onLoad={() => setIframeLoaded(true)}
          />
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

export default AdminLayout;
