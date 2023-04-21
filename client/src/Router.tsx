import { useRoutes } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import CenteredFormLayout from "./pages/CenteredFormLayout";
import CustomerLoginForm from "./components/CustomerLoginForm";
import AdminLoginForm from "./components/AdminLoginForm";
import AdminLayout from "./pages/AdminLayout";

const CustomerLoginPage = () => (
  <CenteredFormLayout
    heading="Self-service Portal"
    title="Self-service Portal - Login"
  >
    <CustomerLoginForm />
  </CenteredFormLayout>
);

const AdminLoginPage = () => (
  <CenteredFormLayout
    heading="Staff Dashboard Login"
    title="Staff Dashboard - Login"
  >
    <AdminLoginForm />
  </CenteredFormLayout>
);

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
    },
    {
      path: "/login",
      element: <CustomerLoginPage />,
    },
    {
      path: "/admin/login",
      element: <AdminLoginPage />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
    },
  ]);
