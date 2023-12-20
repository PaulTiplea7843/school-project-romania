import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import {
  LoginPage,
  RegisterPage,
  LandingPage,
  OurStaff,
  Dashboard
} from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

export default router;
