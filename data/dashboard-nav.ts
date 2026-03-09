import {
  LayoutDashboard,
  BriefcaseBusiness,
  CreditCard,
  Archive,
} from "lucide-react";

export const dashboardNav = [
  {
    icon: LayoutDashboard,
    title: "Overview",
    href: "/dashboard",
    disabled: false,
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs",
    href: "/dashboard/jobs",
    disabled: false,
  },
  {
    icon: CreditCard,
    title: "Payments",
    href: "/dashboard/payments",
    disabled: false,
  },
  {
    icon: Archive,
    title: "Archive",
    href: "/dashboard/archive",
    disabled: false,
  },
];
