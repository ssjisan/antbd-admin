import { DataContext } from "../../DataProcessing/DataProcessing";
import { useContext } from "react";
import { Dashboard, Coverage, Package } from "../../assets/IconSet";

const navConfig = ({ pathname }) => {
  const { auth } = useContext(DataContext);
  const role = auth?.user?.role;

  // Configuration for role 0 and 1 (Full Access)
  const ForCommonRole = [
    {
      title: "Overview",
      icon: (
        <Dashboard color={pathname === "/" ? "#00AE60" : "#637381"} size={20} />
      ),
      items: [
        {
          title: "Dashboard",
          link: "/",
        },
      ],
    },
    {
      title: "Coverage",
      icon: (
        <Coverage
          color={
            pathname.startsWith("/coverage-list") ||
            pathname.startsWith("/add-coverage") ||
            pathname.startsWith("/add-zone")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Zone",
          link: "/add-zone",
        },
        {
          title: "Add Coverage",
          link: "/add-coverage",
        },
        {
          title: "Coverage List",
          link: "/coverage-list",
        },
      ],
    },
    {
      title: "Packages",
      icon: (
        <Package
          color={
            pathname.startsWith("/package-list") ||
            pathname.startsWith("/add-package")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Package",
          link: "/add-package",
        },
        {
          title: "Package List",
          link: "/package-list",
        },
      ],
    },
  ];

  // Only show Students for role 2
  const ForRole2 = [
    {
      title: "Overview",
      icon: (
        <Dashboard color={pathname === "/" ? "#00AE60" : "#637381"} size={20} />
      ),
      items: [
        {
          title: "Dashboard",
          link: "/",
        },
      ],
    },
    {
      title: "Coverage",
      icon: (
        <Coverage
          color={
            pathname.startsWith("/coverage-list") ||
            pathname.startsWith("/add-coverage") ||
            pathname.startsWith("/add-zone")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Zone",
          link: "/add-zone",
        },
        {
          title: "Add Coverage",
          link: "/add-coverage",
        },
        {
          title: "Coverage List",
          link: "/coverage-list",
        },
      ],
    },
    {
      title: "Packages",
      icon: (
        <Package
          color={
            pathname.startsWith("/package-list") ||
            pathname.startsWith("/add-package")
              ? "#00AE60"
              : "#637381"
          }
          size={20}
        />
      ),
      items: [
        {
          title: "Add Package",
          link: "/add-package",
        },
        {
          title: "Package List",
          link: "/package-list",
        },
      ],
    },
  ];
  return role === 2 ? ForRole2 : ForCommonRole;
};

export default navConfig;
