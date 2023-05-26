import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./utils/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const Facilities = lazy(() => import("./pages/Facilities/Facilities"));
const Room = lazy(() => import("./pages/Room/Room"));
const FindRoom = lazy(() => import("./pages/FindRoom/FindRoom"));
const RoomTypeDetail = lazy(() =>
  import("./pages/RoomTypeDetail/RoomTypeDetail")
);
const Loading = lazy(() => import("./components/Loading/Loading"));
const FindService = lazy(() => import("./pages/FindService/FindService"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail/ServiceDetail"));
const Favourites = lazy(() => import("./pages/Favourites/Favourites"));
const ManageAccount = lazy(() => import("./pages/ManageAccount/ManageAccount"));
const Admin = lazy(() => import("./pages/RoomTypeDetail/RoomTypeDetail"));
const NotFound = lazy(() => import("./pages/Error/NotFound/NotFound"));
const Unauthorized = lazy(() =>
  import("./pages/Error/Unauthorized/Unauthorized")
);

function App() {
  const ROLE_CUSTOMER = "ROLE_CUSTOMER";
  const ROLE_EMPLOYEE = "ROLE_EMPLOYEE";
  const ROLE_ADMIN = "ROLE_ADMIN";

  const CustomerRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem("role").replace(/"/g, "");

    if (roleUser === ROLE_CUSTOMER) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  };

  const EmployeeRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem("role").replace(/"/g, "");

    if (roleUser === ROLE_EMPLOYEE) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  };

  const AdminRoute = ({ element }) => {
    const roleUser = sessionStorage.getItem("role").replace(/"/g, "");

    if (roleUser === ROLE_ADMIN) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  };

  const AuthRoute = ({ element }) => {
    const token = sessionStorage.getItem("access_token");

    if (token !== null) {
      return element;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* public routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/facilities"
            element={
              <Suspense fallback={<Loading />}>
                <Facilities />
              </Suspense>
            }
          />
          <Route
            path="/rooms"
            element={
              <Suspense fallback={<Loading />}>
                <Room />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPassword />
              </Suspense>
            }
          />

          {/* customer routes */}
          <Route
            path="/find-rooms"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <FindRoom />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/find-rooms/:roomTypeId"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <RoomTypeDetail />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/find-services"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <FindService />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/find-services/:serviceId"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <ServiceDetail />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/manage-account"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <ManageAccount />
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <CustomerRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <Favourites />
                  </Suspense>
                }
              />
            }
          />

          {/* admin routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute
                element={
                  <Suspense fallback={<Loading />}>
                    <Admin />
                  </Suspense>
                }
              />
            }
          />

          {/* Unauthorized Page */}
          <Route
            path="/unauthorized"
            element={
              <Suspense fallback={<Loading />}>
                <Unauthorized />
              </Suspense>
            }
          />

          {/* Not found routes */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
