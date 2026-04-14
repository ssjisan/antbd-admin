import { useContext } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import PasswordChange from "../UserAuth/PasswordChange";
import Loading from "./Loading";
import MainLayout from "./MainLayout";
import Pages from "../Page/Pages/Pages";
import PageSettings from "../Page/Pages/PageSettings";
import Roles from "../Page/Roles/Roles";
import RoleSettings from "../Page/Roles/RoleSettings";
import Users from "../Page/Users/Users";
import UserSettings from "../Page/Users/UserSettings";
import PermissionRoute from "./PermissionRoute";
import Backup from "../Page/Backup";
import ChangePasswordForm from "../Components/User/ChangePasswordForm";
import ConnectionRequest from "../Page/ConnectionRequest";
import SliderSeetings from "../Page/Slider/SliderSeetings";
import Slider from "../Page/Slider/Slider";
import Client from "../Page/Client";
import Membership from "../Page/Membership";
import ContactInfo from "../Page/ContactInfo";
import PackageList from "../Page/Package/PackageList";
import AddPackage from "../Page/Package/AddPackage";
import AddZone from "../Page/Coverage/AddZone";
import AddCoverageArea from "../Page/Coverage/AddCoverageArea";
import CoverageAreaList from "../Page/Coverage/CoverageAreaList";
import SuccessStoriesList from "../Page/SuccessStories/SuccessStoriesList";
import SuccessStoriesEditor from "../Page/SuccessStories/SuccessStoriesEditor";
import SuccessStoriesPreview from "../Page/SuccessStories/SuccessStoriesPreview";

export default function MainRouters() {
  const { loading } = useContext(DataContext);

  // ⛔ BLOCK rendering until auth is hydrated
  if (loading) return <Loading />;

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route
              path="/success-stories-preview/:id"
              element={<SuccessStoriesPreview />}
            />
            <Route element={<PermissionRoute />}>
              {/* Dashbaord */}
              <Route path="/" element={<Dashboard />} />

              {/* Pages */}
              <Route path="/pages" element={<Pages />} />
              <Route path="/page-settings" element={<PageSettings />} />
              <Route path="/page-settings/:id" element={<PageSettings />} />

              {/* Roles */}
              <Route path="/roles" element={<Roles />} />
              <Route path="/role-settings" element={<RoleSettings />} />
              <Route path="/role-settings/:id" element={<RoleSettings />} />

              {/* Users */}
              <Route path="/users" element={<Users />} />
              <Route path="/user-settings" element={<UserSettings />} />
              <Route path="/user-settings/:id" element={<UserSettings />} />

              {/* Backup */}
              <Route path="/backup" element={<Backup />} />

              {/* Connection request */}
              <Route
                path="/connection-request"
                element={<ConnectionRequest />}
              />

              {/* Slider */}
              <Route path="/slider" element={<Slider />} />
              <Route path="/slider-settings" element={<SliderSeetings />} />
              <Route path="/slider-settings/:id" element={<SliderSeetings />} />

              {/* Clients */}
              <Route path="/client" element={<Client />} />

              {/* Membership*/}
              <Route path="/memberships" element={<Membership />} />

              {/* Contact Info*/}
              <Route path="/contact-info" element={<ContactInfo />} />

              {/* Package */}
              <Route path="/add-package" element={<AddPackage />} />
              <Route path="/add-package/:id" element={<AddPackage />} />
              <Route path="/package-list" element={<PackageList />} />

              {/* Coverage */}
              <Route path="/add-zone" element={<AddZone />} />
              <Route path="/add-coverage" element={<AddCoverageArea />} />
              <Route path="/coverage-list" element={<CoverageAreaList />} />

              {/* Success Stories */}
              <Route path="/success-stories" element={<SuccessStoriesList />} />
              <Route
                path="/success-stories-editor"
                element={<SuccessStoriesEditor />}
              />
              <Route
                path="/success-stories-editor/:id"
                element={<SuccessStoriesEditor />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
