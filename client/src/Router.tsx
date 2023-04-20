import { useRoutes } from "react-router-dom";
import CenteredFormLayout from "./pages/CenteredFormLayout";
import HomeLayout from "./pages/HomeLayout";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AuthGuard from "./components/AuthGuard";
import AdminGuard from "./components/AdminGuard";
import AdminLayout from "./pages/AdminLayout";
import CustomerGuard from "./components/CustomerGuard";

export const Router = () =>
  useRoutes([
    {
      path: "/login",
      element: <CenteredFormLayout heading="Customer Self-Service Portal" />,
      children: [
        {
          index: true,
          element: <LoginForm title="Log in" />,
        },
      ],
    },
    {
      path: "/signup",
      element: <CenteredFormLayout heading="Customer Self-Service Portal" />,
      children: [
        {
          index: true,
          element: <SignupForm />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AuthGuard />,
      children: [
        {
          path: "/admin",
          element: <AdminGuard />,
          children: [
            {
              element: <AdminLayout />,
              index: true,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <AuthGuard />,
      children: [
        {
          path: "/",
          element: <CustomerGuard />,
          children: [
            {
              element: <HomeLayout />,
              index: true,
            },
          ],
        },
      ],
    },
  ]);
