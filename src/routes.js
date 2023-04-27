import Dashboard from "@material-ui/icons/Dashboard";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
// core components/views for Admin layout
import UsersList from "views/UsersList/UsersList.js";
import Groups from "views/Groups/Groups.js";
import Roles from "views/Roles/Roles.js";
import DashboardPage from "views/Dashboard/Dashboard";
import Setting from "views/Setting/Setting";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبورد",
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: "/userList",
    name: "کاربران",
    icon: PeopleIcon,
    component: UsersList,
  },
  {
    path: "/groups",
    name: "گروه‌ها",
    icon: LocalLibraryIcon,
    component: Groups,
  },
  {
    path: "/roles",
    name: "نقش‌ها",
    icon: AssignmentRoundedIcon,
    component: Roles,
  },

  {
    path: "/setting",
    name: "تنظیمات",
    icon: SettingsIcon,
    component: Setting,
  },
  

];

export default dashboardRoutes;

