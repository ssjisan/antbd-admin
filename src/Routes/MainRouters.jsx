import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import AddUser from "../Page/User/AddUser";
import ChangePassword from "../Page/User/ChangePassword";
import UserList from "../Page/User/UserList";
import AddCoverageArea from "../Page/Coverage/AddCoverageArea";
import CoverageAreaList from "../Page/Coverage/CoverageAreaList";
import AddZone from "../Page/Coverage/AddZone";
import AddPackage from "../Page/Package/AddPackage";
import PackageList from "../Page/Package/PackageList";
import ConnectionRequest from "../Page/ConnectionRequest";
import Client from "../Page/Client";
import ContactInfo from "../Page/ContactInfo";
import Membership from "../Page/Membership";
import NewsEditor from "../Page/News/NewsEditor";

export default function MainRouters() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#59B259",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EC4034",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/connection-request" element={<ConnectionRequest />} />
          <Route path="/news-editor" element={<NewsEditor />} />

          {/* User Routes Start */}
          <Route path="/create_use" element={<AddUser />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="user_list" element={<UserList />} />
          {/* User Routes End */}

          {/* Coverage Area Route Start Here */}
          <Route path="/add-coverage" element={<AddCoverageArea />} />
          <Route path="/edit-coverage/:id" element={<AddCoverageArea />} />
          <Route path="/coverage-list" element={<CoverageAreaList />} />
          <Route path="/add-zone" element={<AddZone />} />
          {/* Coverage Area Route End Here */}

          {/* Coverage Area Route Start Here */}
          <Route path="/package-list" element={<PackageList />} />
          <Route path="/add-package" element={<AddPackage />} />
          <Route path="/edit-package/:id" element={<AddPackage />} />
          <Route path="/contact-info" element={<ContactInfo />} />

          {/* Coverage Area Route End Here */}
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
