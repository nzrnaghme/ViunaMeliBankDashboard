import Dashboard from "@material-ui/icons/Dashboard";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
// core components/views for Admin layout
import UsersList from "views/UsersList/UsersList.js";
import Groups from "views/Groups/Groups.js";
import Roles from "views/Roles/Roles.js";
import DashboardPage from "views/Dashboard/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/userList",
    name: "کاربران",
    icon: "content_paste",
    component: UsersList,
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "گروه‌ها",
    icon: LocalLibraryIcon,
    component: Groups,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "نقش‌ها",
    icon: PeopleIcon,
    component: Roles,
    layout: "/admin",
  },

];

export default dashboardRoutes;

