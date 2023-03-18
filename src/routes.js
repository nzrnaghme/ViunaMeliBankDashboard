import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
// import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
// import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import UsersList from "views/UsersList/UsersList.js";
import Groups from "views/Groups/Groups.js";
import DashboardPage from "views/Dashboard/Dashboard";
import LessonList from "views/Lessons/Lessons";
import Comments from "views/Comments/Comments";
import Roles from "views/Students/Roles";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "داشبرد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "اطلاعات کاربر",
    icon: Person,
    component: UserProfile,
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
  {
    path: "/lessons",
    name: "درس ها",
    icon: AssignmentIcon,
    component: LessonList,
    layout: "/admin",
  },
  {
    path: "/comments",
    name: "کامنت ها",
    icon: Notifications,
    component: Comments,
    layout: "/admin",
  },
  // {
  //   path: "/support",
  //   name: "پشتیبانی",
  //   icon: ContactSupportRoundedIcon,
  //   component: Support,
  //   layout: "/admin",
  // },

  // {
  //   path: "/questionAnswer",
  //   name: "پرسش و پاسخ",
  //   icon: QuestionAnswerRoundedIcon,
  //   component: QuestionAnswer,
  //   layout: "/admin",
  // },

  // {
  //   path: "/news",
  //   name: "مقاله و خبر",
  //   icon: PublicRoundedIcon,
  //   component: News,
  //   layout: "/admin",
  // },
  // {
  //   path: "/contactMe",
  //   name: "ارتباط با ما",
  //   icon: QuestionAnswerRoundedIcon,
  //   component: Suggest,
  //   layout: "/admin",
  // },

  // {
  //   path: "/planning",
  //   name: "برنامه روزانه",
  //   icon: LocationOn,
  //   component: Planning,
  //   layout: "/admin",
  // },

];

export default dashboardRoutes;

